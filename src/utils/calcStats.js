import {
  ADVENTURER_ABILITY,
  ELEMENTS_MODIFIER,
  MIGHT_DICT,
  HALIDOM_LIST,
  HALIDOM_VALUES,
  STATS_KEYS,
  dungeonInfo,
} from 'data';
import { calcVal, getField, getLimit } from './index';

const WYRMPRINT_MAX_HP = 8;
const WYRMPRINT_MAX_STR = 20;
const WYRMPRINT_MAX_DEF = 20;
const WYRMPRINT_MAX_RES = 15;
const WYRMPRINT_MAX_REDUCE = 25;

/**
 * @param {Object} a adventurer
 */
const calcAdventurerMight = a => {
  const { ex, id, mana, rarity } = a;
  const skillMight = MIGHT_DICT[`adventurerSkill_${mana}`];

  // Euden: 100001_01
  let setKey;
  if (rarity === '5' || id === '100001_01') {
    setKey = `5_${mana}`;
  } else {
    setKey = `rest_${mana}`;
  }

  const abilitySet = ADVENTURER_ABILITY[setKey];

  const abilityMight = abilitySet.reduce((acc, cur) => {
    if (a[cur]) return acc + a[cur];
    return acc;
  }, 0);

  let fsKey;
  if (mana >= 40) {
    fsKey = '40';
  } else if (mana >= 10) {
    fsKey = '10';
  }

  const fsMight = MIGHT_DICT[`fs_${fsKey}`] || 0;

  const exMight = MIGHT_DICT[`coAbility_${rarity}_${ex}`];

  return skillMight + abilityMight + fsMight + exMight;
};

/**
 * @param {Object} w weapon
 */
const calcWeaponMight = w => {
  // unbind === 4, skill LV2, else skill LV1
  const key = w.unbind === '4' ? '4' : '0';
  const skillMight = w.skill ? MIGHT_DICT[`itemSkill_${key}`] : 0;

  return w.abilities11 + w.abilities21 + skillMight;
};

/**
 * @param {Object} w wyrmprint
 */
const calcWyrmprintMight = w => {
  if (w.unbind === '4') {
    return w.abilities13 + w.abilities23 + w.abilities33;
  }

  if (w.unbind >= '2') {
    return w.abilities12 + w.abilities22 + w.abilities32;
  }

  return w.abilities11 + w.abilities21 + w.abilities31;
};

/**
 * @param {Object} d dragon
 */
const calcDragonMight = d => {
  const bondBonus = d.bond * 10;

  if (d.unbind === '4') {
    return d.abilities12 + d.abilities22 + bondBonus + MIGHT_DICT.itemSkill_4;
  }

  return d.abilities11 + d.abilities21 + bondBonus + MIGHT_DICT.itemSkill_0;
};

/**
 * @param {string} statsKey
 * @param {Object} item
 */
const calcMight = (statsKey, item) => {
  switch (statsKey) {
    case 'adventurer':
      return calcAdventurerMight(item);
    case 'weapon':
      return calcWeaponMight(item);
    case 'wyrmprint1':
    case 'wyrmprint2':
      return calcWyrmprintMight(item);
    case 'dragon':
      return calcDragonMight(item);
    default:
      return 0;
  }
};

/**
 * @param {Object} a adventurer
 * @param {number} i 0 or 1, get Hp or Atk
 */
const calcMCBonus = (a, i) => {
  const key = ['Hp', 'Atk'][i];
  const index = ['50', '45', '40', '30', '20', '10', '0'].indexOf(a.mana);
  const statArray = [
    a[`McFullBonus${key}5`],
    a[`Plus${key}4`],
    a[`Plus${key}3`],
    a[`Plus${key}2`],
    a[`Plus${key}1`],
    a[`Plus${key}0`],
    0,
  ];

  return statArray.slice(index).reduce((acc, cur) => acc + cur, 0);
};

/**
 * @param {string} statsKey
 * @param {Object} item
 * @param {boolean} sameEle
 */
const calcItem = (statsKey, item, sameEle = false) => {
  if (!item) {
    return {
      hp: 0,
      str: 0,
      might: 0,
      augHp: 0,
      augStr: 0,
      tHp: 0,
      tStr: 0,
      tMight: 0,
    };
  }

  const { curRarity } = item;
  let { rarity, level, augHp = 0, augStr = 0 } = item;

  level = Number(level);
  augHp = Number(augHp);
  augStr = Number(augStr);

  if (statsKey === 'adventurer') rarity = 5;
  const field = getField(statsKey);
  const MAX_LEVEL = getLimit(`${field}_${rarity}`);

  let hp = 0;
  let str = 0;
  if (level === MAX_LEVEL) {
    hp = item.MaxHp;
    str = item.MaxAtk;
  } else {
    let baseHp;
    let baseStr;
    let stepHp;
    let stepStr;

    if (statsKey === 'adventurer') {
      baseHp = item[`MinHp${curRarity}`];
      baseStr = item[`MinAtk${curRarity}`];
      stepHp = 'MinHp5';
      stepStr = 'MinAtk5';
    } else {
      baseHp = item.MinHp;
      baseStr = item.MinAtk;
      stepHp = 'MinHp';
      stepStr = 'MinAtk';
    }

    if (level === 1) {
      hp = baseHp;
      str = baseStr;
    } else {
      hp =
        baseHp + ((level - 1) / (MAX_LEVEL - 1)) * (item.MaxHp - item[stepHp]);

      str =
        baseStr +
        ((level - 1) / (MAX_LEVEL - 1)) * (item.MaxAtk - item[stepStr]);
    }
  }

  if (statsKey === 'adventurer') {
    hp += calcMCBonus(item, 0);
    str += calcMCBonus(item, 1);
  }

  hp = calcVal(hp);
  str = calcVal(str);

  if (sameEle) {
    // weapon, dragon has x1.5 bonus when matches adventurer element
    // (hp + augHp) * 1.5 - augHp = hp * 1.5 + augHp * 0.5;
    // augments calculated in augments section
    hp = calcVal(hp * 1.5 + augHp * 0.5);
    str = calcVal(str * 1.5 + augStr * 0.5);
  }

  const tHp = hp + augHp;
  const tStr = str + augStr;

  const bonusMight = calcMight(statsKey, item);
  const might = hp + str + bonusMight;
  const tMight = tHp + tStr + bonusMight;

  return {
    hp,
    str,
    might,
    augHp,
    augStr,
    tHp,
    tStr,
    tMight,
  };
};

/**
 * @param {string[]} halidomList
 * @param {Object} halidom
 */
const calcHalidomValue = (halidomList, halidom) => {
  let hp = 0;
  let str = 0;

  for (let i = 0; i < halidomList.length; i += 1) {
    const key = halidomList[i];
    const { [key]: item } = halidom;
    if (item) {
      const values = HALIDOM_VALUES[item.type][item.level];
      hp += values[0];
      str += values[1];
    }
  }

  return { hp, str };
};

/**
 * @param {Object} details
 * @param {Object} stats
 * @param {Object} stats.adventurer
 * @param {Object} stats.dragon
 * @param {Object} halidom
 */
const calcHalidomDetails = (details, { adventurer, dragon }, halidom) => {
  const { element, weapon } = adventurer;
  const aHalidomFilters = [`adventurer_${element}`, weapon];
  const aHalidomList = HALIDOM_LIST.filter(k =>
    aHalidomFilters.some(f => k.includes(f))
  );
  const aPct = calcHalidomValue(aHalidomList, halidom);

  let dPct = { hp: 0, str: 0 };
  if (dragon) {
    const dHalidomList = HALIDOM_LIST.filter(k =>
      k.includes(`dragon_${dragon.element}`)
    );

    dPct = calcHalidomValue(dHalidomList, halidom);
  }

  const aHp = details.adventurer.tHp * aPct.hp * 0.01;
  const aStr = details.adventurer.tStr * aPct.str * 0.01;
  const dHp = details.dragon.tHp * dPct.hp * 0.01;
  const dStr = details.dragon.tStr * dPct.str * 0.01;

  const hp = calcVal(aHp) + calcVal(dHp);
  const str = calcVal(aStr) + calcVal(dStr);
  const might = hp + str;

  return {
    hp,
    str,
    might,
  };
};

export const calcDetails = (stats, halidom) => {
  if (!stats.adventurer) return null;
  const details = {};

  const { adventurer, wyrmprint1, wyrmprint2, dragon } = stats;

  let baseHp = 0;
  let baseStr = 0;
  let baseMight = 0;
  let augHp = 0;
  let augStr = 0;
  // calc adventurer, weapon, wyrmprint, dragon
  const { element } = adventurer;
  for (let i = 0; i < STATS_KEYS.length; i += 1) {
    const key = STATS_KEYS[i];
    const item = stats[key];
    const sameEle =
      (key === 'weapon' || key === 'dragon') &&
      item &&
      element === item.element;

    const value = calcItem(key, item, sameEle);
    baseHp += value.tHp;
    baseStr += value.tStr;
    baseMight += value.tMight;
    augHp += value.augHp;
    augStr += value.augStr;

    details[key] = value;
  }

  details.augments = {
    hp: augHp,
    str: augStr,
    might: augHp + augStr,
  };

  // calc Halidom
  const halidomDetails = calcHalidomDetails(details, stats, halidom);
  details.halidom = halidomDetails;

  // calc ability
  let hpPct = 0;
  let strPct = 0;
  if (dragon) {
    if (element.includes(dragon.reqEle)) {
      const n = dragon.unbind === '4' ? '2' : '1';
      hpPct = dragon[`incHP${n}`];
      strPct = dragon[`incSTR${n}`];
    }
  }
  // Version 1.7.1, details calc item STR ability, shows in ability section
  // Version 1.8.0, adds incHP wyrmprint

  // adventurer's STR ability

  if (adventurer.incSTR2 && adventurer.mana >= adventurer.STRLV2) {
    strPct += adventurer.incSTR2;
  } else if (adventurer.incSTR1 && adventurer.mana >= adventurer.STRLV1) {
    strPct += adventurer.incSTR1;
  }

  // weapon's STR ability
  if (
    stats.weapon &&
    stats.weapon.incSTR &&
    element.includes(stats.weapon.reqEle)
  ) {
    strPct += stats.weapon.incSTR;
  }

  // wyrmprint's ability
  // TODO: GAME BUG
  // when wear two MUB wyrmprints will exceed the WYRMPRINT_MAX_STR limit
  let wHpPct = 0;
  let wStrPct = 0;
  let w1MUB = false;
  let w2MUB = false;

  if (wyrmprint1) {
    const { unbind } = wyrmprint1;
    let stage = 1;
    if (unbind === '4') {
      stage = 3;
      w1MUB = true;
    } else if (unbind >= '2') {
      stage = 2;
    }

    wHpPct += wyrmprint1[`incHP${stage}`] || 0;
    wStrPct += wyrmprint1[`incSTR${stage}`] || 0;
  }

  if (wyrmprint2) {
    const { unbind } = wyrmprint2;
    let stage = 1;
    if (unbind === '4') {
      stage = 3;
      w2MUB = true;
    } else if (unbind >= '2') {
      stage = 2;
    }

    wHpPct += wyrmprint2[`incHP${stage}`] || 0;
    wStrPct += wyrmprint2[`incSTR${stage}`] || 0;
  }

  if (wHpPct > WYRMPRINT_MAX_HP) {
    wHpPct = WYRMPRINT_MAX_HP;
  }

  if (wStrPct > WYRMPRINT_MAX_STR && !(w1MUB && w2MUB)) {
    wStrPct = WYRMPRINT_MAX_STR;
  }

  hpPct += wHpPct;
  strPct += wStrPct;

  let totalHp = baseHp + halidomDetails.hp;
  let totalStr = baseStr + halidomDetails.str;
  const totalMight = baseMight + halidomDetails.might;

  const abilityHp = totalHp * hpPct * 0.01;
  const abilityStr = totalStr * strPct * 0.01;
  details.ability = {
    hp: calcVal(abilityHp),
    str: calcVal(abilityStr),
    might: 0,
  };

  totalHp += abilityHp;
  totalStr += abilityStr;

  details.total = {
    hp: totalHp,
    str: totalStr,
    might: totalMight,
  };

  return details;
};

/**
 *
 * @param {Object} stats
 * @param {Object} state
 */
export const calcDamage = (
  { adventurer: a, weapon: w, wyrmprint1: w1, wyrmprint2: w2, dragon },
  { dungeon, str, multiplier, def, exDef }
) => {
  const arr = [];
  let totalDef = 1 * def + 1 * exDef;
  if (a.incDef2 && a.mana >= a.defLV2) {
    totalDef += a.incDef2;
    arr.push(`adventurer,def,${a.incDef2}`);
  } else if (a.incDef1 && a.mana >= a.defLv1) {
    totalDef += a.incDef1;
    arr.push(`adventurer,def,${a.incDef1}`);
  }

  // weapon
  if (w && w.incDef && a.element.includes(w.reqEle)) {
    totalDef += w.incDef;
    arr.push(`weapon,def,${w.incDef}`);
  }

  // wyrmprint
  let wHp = 0;
  let wDef = 0;
  let wRes = 0;
  let wReduce = 0;
  const dungeonEle = dungeonInfo[dungeon].element;
  if (w1) {
    let stage = 1;
    if (w1.unbind === '4') {
      stage = 3;
    } else if (w1.unbind >= '2') {
      stage = 2;
    }

    if (w1.incHP1) {
      const temp = w1[`incHP${stage}`];
      wHp += temp;
      arr.push(`wyrmprint1,hp,${temp}`);
    }

    if (w1.incDef1) {
      const temp = w1[`incDef${stage}`];
      wDef += temp;
      arr.push(`wyrmprint1,def,${temp}`);
    }

    if (w1.dungeon === dungeon) {
      const temp = w1[`reduce${stage}`];
      wReduce += temp;
      arr.push(`wyrmprint1,reduce,${temp}`);
    }

    if (w1.resEle === dungeonEle) {
      const temp = w1[`incRes${stage}`];
      wRes += temp;
      arr.push(`wyrmprint1,res,${temp}`);
    }
  }

  if (w2) {
    let stage = 1;
    if (w2.unbind === '4') {
      stage = 3;
    } else if (w2.unbind >= '2') {
      stage = 2;
    }

    if (w2.incHP1) {
      const temp = w1[`incHP${stage}`];
      wHp += temp;

      if (wHp > WYRMPRINT_MAX_HP) {
        arr.push(`wyrmprint2,hp,${temp} -> ${WYRMPRINT_MAX_HP - wHp + temp}`);
      } else {
        arr.push(`wyrmprint2,hp,${temp}`);
      }
    }

    if (w2.incDef1) {
      const temp = w2[`incDef${stage}`];
      wDef += temp;

      if (wDef > WYRMPRINT_MAX_DEF) {
        arr.push(
          `wyrmprint2,def,${temp} -> ${WYRMPRINT_MAX_DEF - wDef + temp}`
        );
        wDef = WYRMPRINT_MAX_DEF;
      } else {
        arr.push(`wyrmprint2,def,${temp}`);
      }
    }

    if (w2.dungeon === dungeon) {
      const temp = w2[`reduce${stage}`];
      wReduce += temp;

      if (wReduce > WYRMPRINT_MAX_REDUCE) {
        arr.push(
          `wyrmprint2,reduce,${temp} -> ${WYRMPRINT_MAX_REDUCE -
            wReduce +
            temp}`
        );
      } else {
        arr.push(`wyrmprint2,reduce,${temp}`);
      }
    }

    if (w2.resEle === dungeonEle) {
      const temp = w2[`incRes${stage}`];
      wRes += temp;

      if (wRes > WYRMPRINT_MAX_RES) {
        arr.push(
          `wyrmprint2,res,${temp} -> ${WYRMPRINT_MAX_RES - wRes + temp}`
        );
      } else {
        arr.push(`wyrmprint2,res,${temp}`);
      }
    }
  }

  let totalRes = wRes;
  totalDef += wDef;
  const { resEle } = dragon || {};

  if (resEle === dungeonEle) {
    const { incRes } = dragon;
    totalRes += incRes;
    arr.push(`dragon,res,${incRes}`);
  }

  let eleModifier = 1;
  if (a.element === ELEMENTS_MODIFIER[dungeonEle].da) {
    eleModifier = 0.5;
  } else if (a.element === ELEMENTS_MODIFIER[dungeonEle].ad) {
    eleModifier = 1.5;
  }

  const base =
    ((5 / 3) *
      str *
      multiplier *
      eleModifier *
      (1 - wReduce * 0.01) *
      (1 - totalRes * 0.01)) /
    (a.DefCoef * (1 + totalDef * 0.01));

  const parseDamage = val => {
    const tolerance = 0.00001;
    const round = Math.round(val);
    if (Math.abs(val - round) < tolerance) {
      return round;
    }

    return Math.floor(val);
  };

  const min = parseDamage(base * 0.95);
  const max = parseDamage(base * 1.05);

  return { min, max, arr };
};
