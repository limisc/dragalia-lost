import {
  actionTypes,
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

const getAdventurerMight = (adventurer, state) => {
  const { mana, ex } = state;

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
  const intEx = parseInt(ex, 10) || 0;

  const abilitySet = (adventurer.rarity === "5" || adventurer.Id === "100001_01_r0") ? rarity5Set[strMana] : rarity34Set[strMana];



  const skillMight = skillMightSet[strMana];
  const abilityMight = abilitySet.reduce((acc, k) => {
    if (adventurer[k]) {
      return acc + adventurer[k];
    }

    return acc;
  }, 0);
  const fsMight = intMana >= 40 ? 120 : intMana >= 10 ? 60 : 0;
  const exMight = adventurer["Ex" + intEx];

  return skillMight + abilityMight + fsMight + exMight;
}

const getWeaponMight = (weapon, state) => {
  const { unbind } = state;
  const intUnbind = parseInt(unbind, 10) || 0;

  let skillMight = 0;
  if (weapon.Skill) {
    skillMight = intUnbind === 4 ? 100 : 50;
  }

  return skillMight + weapon.Abilities11 + weapon.Abilities21;
}

const getWyrmprintMight = (wyrmprint, state) => {
  const { unbind } = state;
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

const getDragonMight = (dragon, state) => {
  const { unbind } = state;
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
  }, skillMight);
}

const getMight = (statsKey, item, state) => {
  if (item) {
    switch (statsKey) {
      case "adventurer":
        return getAdventurerMight(item, state);
      case "weapon":
        return getWeaponMight(item, state);
      case "wyrmprint1":
      case "wyrmprint2":
        return getWyrmprintMight(item, state);
      case "dragon":
        return getDragonMight(item, state);
      default:
        return 0;
    }
  }

  return 0;
}

const getDetails = (statsKey, item, state) => {
  let HP = 0;
  let STR = 0;
  let might = 0;
  if (item && state) {
    let {
      level,
      mana,
      rarity,
    } = state;
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
        base_HP = item["MinHp" + rarity];
        base_STR = item["MinAtk" + rarity];
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
    might = getMight(statsKey, item, state);
  }

  return {
    HP,
    STR,
    might,
  };
}

const detailReducer = (details, action, stats) => {
  const { type, statsKey, state } = action;
  const { [statsKey]: item } = stats;
  if (type === actionTypes.UPDATE_DETAILS) {
    return {
      ...details,
      [statsKey]: getDetails(statsKey, item, state),
    }
  }

  return details;
}

export default detailReducer;