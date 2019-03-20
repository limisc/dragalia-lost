import {
  actionTypes,
  reducerCreator,
  getLimit,
} from "actions";

const getManaCircleBonus = (adventurer, key, mana) => {
  const strMana = mana.toString() || "0";
  const index = ["50", "45", "40", "30", "20", "10", "0"].indexOf(strMana);
  const statArray = [
    adventurer["McFullBonus" + key + "5"],
    adventurer["Plus" + key + "4"],
    adventurer["Plus" + key + "3"],
    adventurer["Plus" + key + "2"],
    adventurer["Plus" + key + "1"],
    adventurer["Plus" + key + "0"],
    0,
  ];

  return statArray.slice(index).reduce((acc, cur) => acc + cur, 0);
}

const getAdventurerMight = (adventurer) => {
  const { mana, ex } = adventurer;

  const skillMightSet = {
    "50": 500,       //300+200,
    "45": 500,       //300+200,
    "40": 400,       //200+200,
    "30": 300,       //200+100,
    "20": 200,       //100+100,
    "10": 100,
    "0": 100,
  };

  const rarity5Set = {
    "50": ["Abilities12", "Abilities22", "Abilities32"],
    "45": ["Abilities12", "Abilities22", "Abilities32"],
    "40": ["Abilities12", "Abilities22", "Abilities31"],
    "30": ["Abilities12", "Abilities21", "Abilities31"],
    "20": ["Abilities11", "Abilities21", "Abilities31"],
    "10": ["Abilities11", "Abilities21"],
    "0": [],
  }

  const rarity34Set = {
    "50": ["Abilities12", "Abilities22", "Abilities31"],
    "45": ["Abilities12", "Abilities22", "Abilities31"],
    "40": ["Abilities12", "Abilities22"],
    "30": ["Abilities12", "Abilities21"],
    "20": ["Abilities11", "Abilities21"],
    "10": ["Abilities11", "Abilities21"],
    "0": [],
  }

  const strMana = mana.toString() || "0";
  const intMana = parseInt(mana, 10) || 0;
  const intEX = parseInt(ex, 10) || 0;

  const abilitySet = (adventurer.rarity === "5" || adventurer.id === "100001_01_r0")
    ? rarity5Set[strMana]
    : rarity34Set[strMana];



  const skillMight = skillMightSet[strMana];
  const abilityMight = abilitySet.reduce((acc, k) => {
    if (adventurer[k]) {
      return acc + adventurer[k];
    }

    return acc;
  }, 0);
  const fsMight = intMana >= 40 ? 120 : intMana >= 10 ? 60 : 0;
  const exMight = adventurer["EX" + intEX];

  return skillMight + abilityMight + fsMight + exMight;
}

const getWeaponMight = (weapon) => {
  const { unbind } = weapon;
  const intUnbind = parseInt(unbind, 10) || 0;

  let skillMight = 0;
  if (weapon.Skill) {
    skillMight = intUnbind === 4 ? 100 : 50;
  }

  return skillMight + weapon.Abilities11 + weapon.Abilities21;
}

const getWyrmprintMight = (wyrmprint) => {
  const { unbind } = wyrmprint;
  const intUnbind = parseInt(unbind, 10) || 0;
  const abilitySet = intUnbind === 4
    ? ["Abilities12", "Abilities22", "Abilities32"]
    : ["Abilities11", "Abilities21", "Abilities31"];

  return abilitySet.reduce((acc, k) => {
    if (!!wyrmprint[k]) {
      return acc + wyrmprint[k];
    }

    return acc;
  }, 0);
}

const getDragonMight = (dragon) => {
  const { bond, unbind } = dragon;
  const intBond = parseInt(bond, 10) || 1;
  const intUnbind = parseInt(unbind, 10) || 0;
  const skillMight = intUnbind === 4 ? 100 : 50;
  const abilitySet = (
    intUnbind === 4
      ? ["Abilities12", "Abilities22"]
      : ["Abilities11", "Abilities21"]
  );

  return abilitySet.reduce((acc, k) => {
    if (!!dragon[k]) {
      return acc + dragon[k];
    }

    return acc;
  }, skillMight + intBond * 10);
}

const getMight = (statsKey, item) => {
  switch (statsKey) {
    case "adventurer":
      return getAdventurerMight(item);
    case "weapon":
      return getWeaponMight(item);
    case "wyrmprint1":
    case "wyrmprint2":
      return getWyrmprintMight(item);
    case "dragon":
      return getDragonMight(item);
    default:
      return 0;
  }
}

const calcDetails = (statsKey, item, sameElement = false) => {
  let HP = 0;
  let STR = 0;
  let might = 0;
  if (item) {
    let {
      level,
      mana,
      rarity,
      curRarity,
    } = item;
    const temp = statsKey === "adventurer" ? "5" : rarity;
    const MAX_LEVEL = getLimit(statsKey, temp);

    level = parseInt(level, 10);
    if (!level || level < 1) level = 1;

    if (level === MAX_LEVEL) {
      HP = item.MaxHp;
      STR = item.MaxAtk;
    } else {
      let base_HP, base_STR, stepHP, stepSTR;
      if (statsKey === "adventurer") {
        base_HP = item["MinHp" + curRarity];
        base_STR = item["MinAtk" + curRarity];
        stepHP = "MinHp5";
        stepSTR = "MinAtk5";
      } else {
        base_HP = item.MinHp;
        base_STR = item.MinAtk;
        stepHP = "MinHp";
        stepSTR = "MinAtk";
      }

      if (level === 1) {
        HP = base_HP;
        STR = base_STR;
      } else {
        HP = base_HP + (level - 1) / (MAX_LEVEL - 1) * (item.MaxHp - item[stepHP]);
        STR = base_STR + (level - 1) / (MAX_LEVEL - 1) * (item.MaxAtk - item[stepSTR])
      }
    }

    if (statsKey === "adventurer") {
      HP += getManaCircleBonus(item, "Hp", mana);
      STR += getManaCircleBonus(item, "Atk", mana);
    }

    HP = Math.ceil(HP);
    STR = Math.ceil(STR);

    if (sameElement) {
      HP = Math.ceil(HP * 1.5);
      STR = Math.ceil(STR * 1.5);
    }

    might = HP + STR + getMight(statsKey, item);
  }

  return {
    HP,
    STR,
    might,
  };
}


const syncStats = (details, action, stats) => {
  const updates = {};
  const { adventurer } = stats;
  Object.keys(stats).forEach((k) => {
    const item = stats[k];
    if (item) {
      const sameElement = (k === "weapon" || k === "dragon")
        && adventurer
        && adventurer.element === item.element;
      updates[k] = calcDetails(k, item, sameElement);
    }
  });

  if (!!Object.keys(updates).length) {
    return {
      ...details,
      ...updates,
    };
  }

  return details;
};

const selectStats = (details, action, newStats, prevStats) => {
  const { statsKey, item } = action;

  if (
    prevStats[statsKey]
    && item
    && prevStats[statsKey].id === item.id
  ) {
    return details;
  }

  const {
    adventurer,
    weapon,
    wyrmprint1,
    wyrmprint2,
    dragon,
  } = newStats;

  if (statsKey === "adventurer") {
    const updates = {};
    //case select adventurer, auto equipt dungeon wyrmrprint.
    if (
      (!prevStats.wyrmprint1 && wyrmprint1)
      || (
        prevStats.wyrmprint1
        && wyrmprint1
        && prevStats.wyrmprint1.id !== wyrmprint1.id
      )
    ) {
      updates.wyrmprint1 = calcDetails("wyrmprint1", wyrmprint1);
    }

    if (!prevStats.wyrmprint2 && wyrmprint2) {
      updates.wyrmprint2 = calcDetails("wyrmprint2", wyrmprint2);
    }

    const sameElement1 = adventurer && weapon && adventurer.element === weapon.element;
    const sameElement2 = adventurer && dragon && adventurer.element === dragon.element;

    return {
      ...details,
      ...updates,
      adventurer: calcDetails(statsKey, adventurer),
      weapon: calcDetails("weapon", weapon, sameElement1),
      dragon: calcDetails("dragon", dragon, sameElement2),
    };
  } else if (statsKey === "weapon") {
    const updates = {};
    if (!adventurer) {
      updates.adventurer = calcDetails("adventurer", adventurer);
      updates.dragon = calcDetails("dragon", dragon);
    }
    const sameElement = adventurer && weapon && adventurer.element === weapon.element;

    return {
      ...details,
      ...updates,
      weapon: calcDetails(statsKey, weapon, sameElement),
    };
  } else if (statsKey === "wyrmprint1" || statsKey === "wyrmprint2") {
    const complement = {
      wyrmprint1: "wyrmprint2",
      wyrmprint2: "wyrmprint1",
    };

    const another = complement[statsKey];
    if (
      (!prevStats[another] && !newStats[another])
      || (prevStats[another] && newStats[another] && prevStats[another].id === newStats[another].id)
    ) {
      return {
        ...details,
        [statsKey]: calcDetails(statsKey, newStats[statsKey]),
      };
    }

    return {
      ...details,
      wyrmprint1: calcDetails("wyrmprint1", wyrmprint1),
      wyrmprint2: calcDetails("wyrmprint2", wyrmprint2),
    };
  } else if (statsKey === "dragon") {
    const sameElement = adventurer && dragon && adventurer.element === dragon.element;

    return {
      ...details,
      dragon: calcDetails(statsKey, dragon, sameElement),
    }
  }

  return details;
}

const updateStats = (details, action, stats) => {
  const { statsKey } = action;
  const { adventurer, [statsKey]: item } = stats;
  const sameElement = (statsKey === "weapon" || statsKey === "dragon")
    && adventurer && adventurer.element === item.element;

  return {
    ...details,
    [statsKey]: calcDetails(statsKey, stats[statsKey], sameElement),
  };
}

const detailReducer = reducerCreator({
  [actionTypes.SYNC_STATS]: syncStats,
  [actionTypes.SELECT_STATS]: selectStats,
  [actionTypes.UPDATE_STATS]: updateStats,
});


export default detailReducer;