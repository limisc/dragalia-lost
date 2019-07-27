/* eslint-disable no-unused-vars */
import { statsKeys } from 'store';
import { mightDict, dungeonInfo, elements, values } from 'data';
import { getLimit, getHalidomSectionKey } from './selectors';

const MAX_WYRMPRINT_HP = 8;
const MAX_WYRMPRINT_STR = 20;
const MAX_WYRMPRINT_DEF = 20;
const MAX_WYRMPRINT_RES = 15;
const MAX_WYRMPRINT_COUNTER = 25;

export const calcVal = value => {
  const tolerance = 0.00001;
  const round = Math.round(value);
  if (Math.abs(value - round) < tolerance) {
    return round;
  }

  return Math.ceil(value);
};

export const getDetails = (stats, halidom) => {
  // getDetails uses with stats.adventurer exists, so no need recheck here.
  const details = {};

  const { adventurer, wyrmprint1, wyrmprint2, dragon } = stats;

  let HP, STR, might;
  // base, sum of stats fields, excludes Halidom and Ability
  let baseHP, baseSTR, baseMight;
  let augHP = 0;
  let augSTR = 0;
  HP = STR = might = baseHP = baseSTR = baseMight = 0;

  // calc adventurer, weapon, wyrmprint, dragon
  statsKeys.forEach(statsKey => {
    const sameEle =
      (statsKey === 'weapon' || statsKey === 'dragon') &&
      stats[statsKey] &&
      adventurer.element === stats[statsKey].element;

    const value = calcDetails(statsKey, stats[statsKey], sameEle);
    augHP += value.augHP;
    augSTR += value.augSTR;

    baseHP += value.HP;
    baseSTR += value.STR;
    baseMight += value.might;
    details[statsKey] = value;
  });
  details.augments = { HP: augHP, STR: augSTR, might: augHP + augSTR };
  // calc halidom
  const keys = getHalidomSectionKey(stats);

  // calc facility bonus percent
  const element = calcSection(halidom.element[keys.element]);
  const weapon = calcSection(halidom.weapon[keys.weapon]);
  const fafnir = calcSection(halidom.dragon[keys.dragon]);

  // V1.9 fixed fafnir bug

  const adventurerAugHP = adventurer.augHP || 0;
  const adventurerAugSTR = adventurer.augSTR || 0;
  let dragonAugHP, dragonAugSTR;
  dragonAugHP = dragonAugSTR = 0;

  if (dragon) {
    dragonAugHP = dragon.augHP || 0;
    dragonAugSTR = dragon.augSTR || 0;
  }

  HP =
    calcVal(
      (details.adventurer.HP + adventurerAugHP) *
        (element.HP + weapon.HP) *
        0.01
    ) + calcVal((details.dragon.HP + dragonAugHP) * fafnir.HP * 0.01);
  STR =
    calcVal(
      (details.adventurer.STR + adventurerAugSTR) *
        (element.STR + weapon.STR) *
        0.01
    ) + calcVal((details.dragon.STR + dragonAugSTR) * fafnir.STR * 0.01);

  might = HP + STR;
  details.halidom = { HP, STR, might };
  let totalHP = baseHP + HP + augHP;
  let totalSTR = baseSTR + STR + augSTR;
  let totalMight = baseMight + might + details.augments.might;

  // calc ability
  // Version 1.7.1, details calc item STR ability, shows in ability section
  // Version 1.8.0, adds incHP wyrmprint
  let totalIncHP, totalIncSTR;
  totalIncHP = totalIncSTR = 0;
  // adventurer's STR ability
  if (adventurer.incSTR1) {
    if (adventurer.incSTR2 && adventurer.mana * 1 >= adventurer.STRLV2) {
      totalIncSTR += adventurer.incSTR2;
    } else if (adventurer.mana * 1 >= adventurer.STRLV1) {
      totalIncSTR += adventurer.incSTR1;
    }
  }

  // weapon's STR ability
  if (
    stats.weapon &&
    stats.weapon.incSTR &&
    adventurer.element.indexOf(stats.weapon.reqEle) !== -1
  ) {
    totalIncSTR += stats.weapon.incSTR;
  }

  // wyrmprint's ability
  // TODO: in game bug, when wear two MUB wyrmprints will exceed the MAX_WYRMPRINT_STR limit
  let wHP, wSTR;
  let w1MUB, w2MUB;
  wHP = wSTR = 0;
  w1MUB = w2MUB = false;

  if (wyrmprint1) {
    const unbind = wyrmprint1.unbind * 1;
    let stage = 1;
    if (unbind === 4) {
      stage = 3;
      w1MUB = true;
    } else if (unbind >= 2) {
      stage = 2;
    }

    wHP += wyrmprint1[`incHP${stage}`] || 0;
    wSTR += wyrmprint1[`incSTR${stage}`] || 0;
  }

  if (wyrmprint2) {
    const unbind = wyrmprint2.unbind * 1;
    let stage = 1;
    if (unbind === 4) {
      stage = 3;
      w2MUB = true;
    } else if (unbind >= 2) {
      stage = 2;
    }

    wHP += wyrmprint2[`incHP${stage}`] || 0;
    wSTR += wyrmprint2[`incSTR${stage}`] || 0;
  }

  if (wHP > MAX_WYRMPRINT_HP) {
    wHP = MAX_WYRMPRINT_HP;
  }

  if (wSTR > MAX_WYRMPRINT_STR && !(w1MUB && w2MUB)) {
    wSTR = MAX_WYRMPRINT_STR;
  }

  totalIncHP += wHP;
  totalIncSTR += wSTR;

  if (adventurer && dragon && adventurer.element === dragon.element) {
    const aLV = dragon.unbind === '4' ? '2' : '1';
    totalIncHP += dragon[`incHP${aLV}`];
    totalIncSTR += dragon[`incSTR${aLV}`];
  }

  // ability total detail value
  HP = totalHP * totalIncHP * 0.01;
  STR = totalSTR * totalIncSTR * 0.01;
  details.ability = {
    HP: calcVal(HP),
    STR: calcVal(STR),
    might: 0,
  };

  totalHP += HP;
  totalSTR += STR;

  details.total = {
    HP: totalHP,
    STR: totalSTR,
    might: totalMight,
  };
  return details;
};

export const getDamage = (stats, state) => {
  // getDamage uses with stats.adventurer exists, so no need recheck here.
  const { adventurer, weapon, wyrmprint1, wyrmprint2, dragon } = stats;
  const textArea = [];

  const { dungeon, mult, exDef, def } = state;
  let temp;
  let tRes = 0;
  let tCounter = 0;
  let tDef = exDef * 1 + def * 1;

  if (adventurer.incDef1) {
    const { mana, defLV1, defLV2, incDef1, incDef2 } = adventurer;
    if (defLV2 && mana * 1 >= defLV2) {
      temp = incDef2;
    } else if (mana >= defLV1) {
      temp = incDef1;
    }
    if (temp) {
      tDef += temp;
      textArea.push(`adventurer,def,${temp}`);
      temp = null;
    }
  }

  // weapon Def
  if (
    weapon &&
    weapon.incDef &&
    adventurer.element.indexOf(weapon.reqEle) !== -1
  ) {
    tDef += weapon.incDef;
    textArea.push(`weapon,def,${weapon.incDef}`);
  }

  const info = dungeonInfo[dungeon];
  let wDef, wCounter, wRes;
  wDef = wCounter = wRes = 0;

  if (wyrmprint1) {
    let stage = 1;
    const unbind = wyrmprint1.unbind * 1;

    if (unbind === 4) {
      stage = 3;
    } else if (unbind >= 2) {
      stage = 2;
    }

    if (wyrmprint1.incHP1) {
      temp = wyrmprint1[`incHP${stage}`] || wyrmprint1[`incHP${stage - 1}`];
      textArea.push(`wyrmprint1,HP,${temp}`);
    }

    if (wyrmprint1.incDef1) {
      temp = wyrmprint1[`incDef${stage}`] || wyrmprint1[`incDef${stage - 1}`];
      wDef += temp;
      textArea.push(`wyrmprint1,def,${temp}`);
    }

    if (dungeon === wyrmprint1.dungeon) {
      temp = wyrmprint1[`counter${stage}`] || wyrmprint1[`counter${stage - 1}`];
      wCounter += temp;
      textArea.push(`wyrmprint1,counter,${temp}`);
    }

    if (info.element === wyrmprint1.resEle) {
      temp = wyrmprint1[`incRes${stage}`] || wyrmprint1[`incRes${stage - 1}`];
      wRes += temp;
      textArea.push(`wyrmprint1,res,${temp}`);
    }
  }

  if (wyrmprint2) {
    let stage = 1;
    const unbind = wyrmprint2.unbind * 1;

    if (unbind === 4) {
      stage = 3;
    } else if (unbind >= 2) {
      stage = 2;
    }

    if (wyrmprint2.incHP1) {
      temp = wyrmprint2[`incHP${stage}`] || wyrmprint2[`incHP${stage - 1}`];
      textArea.push(`wyrmprint2,HP,${temp}`);
    }

    if (wyrmprint2.incDef1) {
      temp = wyrmprint2[`incDef${stage}`] || wyrmprint2[`incDef${stage - 1}`];
      wDef += temp;

      if (wDef > MAX_WYRMPRINT_DEF) {
        textArea.push(
          `wyrmprint2,def,${temp} -> ${MAX_WYRMPRINT_DEF - wDef + temp}`
        );
        wDef = MAX_WYRMPRINT_DEF;
      } else {
        textArea.push(`wyrmprint2,def,${temp}`);
      }
    }

    if (dungeon === wyrmprint2.dungeon) {
      temp = wyrmprint2[`counter${stage}`] || wyrmprint2[`counter${stage - 1}`];
      wCounter += temp;

      if (wCounter > MAX_WYRMPRINT_COUNTER) {
        textArea.push(
          `wyrmprint2,counter,${temp} -> ${MAX_WYRMPRINT_COUNTER -
            wCounter +
            temp}`
        );
        wCounter = MAX_WYRMPRINT_COUNTER;
      } else {
        textArea.push(`wyrmprint2,counter,${temp}`);
      }
    }

    if (info.element === wyrmprint2.resEle) {
      temp = wyrmprint2[`incRes${stage}`] || wyrmprint2[`incRes${stage - 1}`];
      wRes += temp;
      if (wRes > MAX_WYRMPRINT_RES) {
        textArea.push(
          `wyrmprint2,res,${temp} -> ${MAX_WYRMPRINT_RES - wRes + temp}`
        );
        wRes = MAX_WYRMPRINT_RES;
      } else {
        textArea.push(`wyrmprint2,res,${temp}`);
      }
    }
  }

  tDef += wDef;
  tRes += wRes;
  tCounter += wCounter;

  const { resEle } = dragon || {};
  if (info.element === resEle) {
    tRes += dragon.incRes;
    textArea.push(`dragon,res,${dragon.incRes}`);
  }

  let eleModifier = 1;
  if (adventurer.element === elements[info.element].disAdvantage) {
    eleModifier = 0.5;
  } else if (adventurer.element === elements[info.element].advantage) {
    eleModifier = 1.5;
  }

  const base =
    ((5 / 3) *
      info.STR *
      mult *
      eleModifier *
      (1 - tCounter * 0.01) *
      (1 - tRes * 0.01)) /
    (adventurer.DefCoef * (1 + tDef * 0.01));

  const max = Math.floor(base * 1.05);
  const min = Math.floor(base * 0.95);

  return { max, min, textArea };
};

export const calcSection = section => {
  if (!section) {
    return { HP: 0, STR: 0 };
  }

  let HP, STR;
  HP = STR = 0;
  Object.keys(section).forEach(itemKey => {
    const { type, level } = section[itemKey];
    const value = values[type][level];
    HP += value.HP;
    STR += value.STR;
  });

  return { HP, STR };
};

export const calcDetails = (statsKey, item, sameEle = false) => {
  let HP, STR, might;
  HP = STR = might = 0;
  let augHP = 0;
  let augSTR = 0;
  if (item) {
    const { level, mana, rarity, curRarity } = item;
    augHP = item.augHP || 0;
    augSTR = item.augSTR || 0;
    const temp = statsKey === 'adventurer' ? '5' : rarity;
    const MAX_LEVEL = getLimit(statsKey, temp);

    if (level * 1 === MAX_LEVEL) {
      HP = item.MaxHp;
      STR = item.MaxAtk;
    } else {
      let base_HP, base_STR, stepHP, stepSTR;
      if (statsKey === 'adventurer') {
        base_HP = item['MinHp' + curRarity];
        base_STR = item['MinAtk' + curRarity];
        stepHP = 'MinHp5';
        stepSTR = 'MinAtk5';
      } else {
        base_HP = item.MinHp;
        base_STR = item.MinAtk;
        stepHP = 'MinHp';
        stepSTR = 'MinAtk';
      }

      if (level * 1 === 1) {
        HP = base_HP;
        STR = base_STR;
      } else {
        HP =
          base_HP +
          ((level - 1) / (MAX_LEVEL - 1)) * (item.MaxHp - item[stepHP]);
        STR =
          base_STR +
          ((level - 1) / (MAX_LEVEL - 1)) * (item.MaxAtk - item[stepSTR]);
      }
    }

    if (statsKey === 'adventurer') {
      HP += getMCBonus(item, 'Hp', mana);
      STR += getMCBonus(item, 'Atk', mana);
    }

    HP = calcVal(HP + augHP);
    STR = calcVal(STR + augSTR);

    if (sameEle) {
      // adventurer equipt same element weapon || dragon has 1.5 bonus
      HP = calcVal(HP * 1.5);
      STR = calcVal(STR * 1.5);
    }

    HP -= augHP;
    STR -= augSTR;
    might = HP + STR + getMight(statsKey, item);
  }

  return {
    HP,
    STR,
    might,
    augHP,
    augSTR,
  };
};

const getMCBonus = (adventurer, key, mana) => {
  const index = ['50', '45', '40', '30', '20', '10', '0'].indexOf(mana);
  const statArray = [
    adventurer[`McFullBonus${key}5`],
    adventurer[`Plus${key}4`],
    adventurer[`Plus${key}3`],
    adventurer[`Plus${key}2`],
    adventurer[`Plus${key}1`],
    adventurer[`Plus${key}0`],
    0,
  ];

  return statArray.slice(index).reduce((acc, cur) => acc + cur, 0);
};

const getMight = (statsKey, item) => {
  switch (statsKey) {
    case 'adventurer':
      return getAdventurerMight(item);
    case 'weapon':
      return getWeaponMight(item);
    case 'wyrmprint1':
    case 'wyrmprint2':
      return getWyrmprintMight(item);
    case 'dragon':
      return getDragonMight(item);
    default:
      return 0;
  }
};

const getAdventurerMight = adventurer => {
  const { mana, ex, rarity } = adventurer;

  const skillMight = mightDict.adventurerSkill[mana];

  // Euden: 100001_01
  const abilitySet =
    adventurer.rarity === '5' || adventurer.id === '100001_01'
      ? mightDict.adventurerAbility['5'][mana]
      : mightDict.adventurerAbility.res[mana];

  const abilityMight = abilitySet.reduce((acc, k) => {
    if (adventurer[k]) {
      return acc + adventurer[k];
    }

    return acc;
  }, 0);

  const intMana = mana * 1;
  const fsMight =
    intMana >= 40 ? mightDict.fs['40'] : intMana >= 10 ? mightDict.fs['10'] : 0;
  const exMight = mightDict.ex[rarity][ex];

  return skillMight + abilityMight + fsMight + exMight;
};

const getWeaponMight = weapon => {
  // unbind === 4, skill LV2, else skill LV1
  let skillMight = 0;
  if (weapon.skill)
    skillMight =
      weapon.unbind === '4'
        ? mightDict.itemSkill['4']
        : mightDict.itemSkill['0'];
  return weapon.abilities11 + weapon.abilities21 + skillMight;
};

const getWyrmprintMight = wyrmprint => {
  const {
    unbind,
    abilities11,
    abilities12,
    abilities13,
    abilities21,
    abilities22,
    abilities23,
    abilities31,
    abilities32,
    abilities33,
  } = wyrmprint;

  if (unbind === '4') {
    return abilities13 + abilities23 + abilities33;
  } else if (wyrmprint.unbind * 1 >= 2) {
    return abilities12 + abilities22 + abilities32;
  }

  return abilities11 + abilities21 + abilities31;
};

const getDragonMight = dragon => {
  const bondBonus = dragon.bond * 10;
  if (dragon.unbind * 1 === 4) {
    return (
      dragon.abilities12 +
      dragon.abilities22 +
      bondBonus +
      mightDict.itemSkill['4']
    );
  }
  return (
    dragon.abilities11 +
    dragon.abilities21 +
    bondBonus +
    mightDict.itemSkill['0']
  );
};
