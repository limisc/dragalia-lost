import actionTypes from '../actions/actionTypes';
import { getHalidomValue } from '../actions/actions';

const getManaBonus = (adventurer, key) => {
  const mana = adventurer.mana.toString();
  const index = ["50", "45", "40", "30", "20", "10", "0"].indexOf(mana);
  const statArray = [
    adventurer["McFullBonus" + key + "5"],
    adventurer["Plus" + key + "4"],
    adventurer["Plus" + key + "3"],
    adventurer["Plus" + key + "2"],
    adventurer["Plus" + key + "1"],
    adventurer["Plus" + key + "0"],
    0,
  ];
  return statArray.slice(index).reduce((acc, cur) => acc + cur);
}


const calcMight = (section, item, HP, STR) => {
  const { mana, EX } = item;
  let might = HP + STR;
  if (section === "adventurer") {
    const skillMightSet = {
      "50": 500,       //300+200,
      "45": 500,       //300+200,
      "40": 400,       //200+200,
      "30": 300,       //200+100,
      "20": 200,       //100+100,
      "10": 100,
      "0": 100,
    }

    const rarity5Set = {
      "50": ["Abilities12", "Abilities22", "Abilities32"],
      "45": ["Abilities12", "Abilities22", "Abilities32"],
      "40": ["Abilities12", "Abilities22", "Abilities31"],
      "30": ["Abilities12", "Abilities21", "Abilities31"],
      "20": ["Abilities11", "Abilities21", "Abilities31"],
      "10": ["Abilities11", "Abilities21"],
      "0": [],
    }

    const rarityResSet = {
      "50": ["Abilities12", "Abilities22", "Abilities31"],
      "45": ["Abilities12", "Abilities22", "Abilities31"],
      "40": ["Abilities12", "Abilities22"],
      "30": ["Abilities12", "Abilities21"],
      "20": ["Abilities11", "Abilities21"],
      "10": ["Abilities11", "Abilities21"],
      "0": [],
    }

    const abilitySet = item.rarity === "5" ? rarity5Set[mana] : rarityResSet[mana];

    for (const a of abilitySet) {
      if (item[a]) {
        might += item[a];
      }
    }

    const manaValue = parseInt(mana, 10) || 0;
    const fsMight = manaValue >= 40 ? 120 : manaValue >= 10 ? 60 : 0;
    const EXValue = (parseInt(EX, 10) || 0) + 1;
    might += skillMightSet[mana] + fsMight + item["ExAbilityData" + EXValue];
  } else if (section === "weapon") {
    if (item["Skill"] === "1") {
      might += item.unbind === "4" ? 100 : 50;
    }
    const abilitySet = ["Abilities11", "Abilities21"];
    for (const a of abilitySet) {
      if (item[a]) {
        might += item[a];
      }
    }

  } else if (section === "wyrmprint1" || section === "wyrmprint2") {
    const abilitySet = item.unbind === "4" ? ["Abilities12", "Abilities22", "Abilities32"] : ["Abilities11", "Abilities21", "Abilities31"];
    for (const a of abilitySet) {
      if (item[a]) {
        might += item[a];
      }
    }
  } else if (section === "dragon") {
    //Skill Might Value
    might += item.unbind === "4" ? 100 : 50;
    const abilitySet = item.unbind === "4" ? ["Abilities12", "Abilities22"] : ["Abilities11", "Abilities21"];
    for (const a of abilitySet) {
      if (item[a]) {
        might += item[a];
      }
    }

    might += (parseInt(item.bond, 10) || 0) * 10;
  }
  return might;
}

const calcDetail = (section, item, modifier = 1) => {
  let HP = 0, STR = 0, might = 0;
  if (item) {
    let { level, curRarity } = item;
    level = parseInt(level, 10);
    if (!level || level < 1) level = 1;

    if (level === item.MAX_LEVEL) {
      HP = item.MaxHp;
      STR = item.MaxAtk;
    } else {
      let base_HP, base_STR, stepHP, stepSTR;
      if (section === "adventurer") {
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
        HP = base_HP + (level - 1) / (item.MAX_LEVEL - 1) * (item.MaxHp - item[stepHP]);
        STR = base_STR + (level - 1) / (item.MAX_LEVEL - 1) * (item.MaxAtk - item[stepSTR])
      }
    }
    if (section === "adventurer") {
      HP = HP + getManaBonus(item, "Hp");
      STR = STR + getManaBonus(item, "Atk");
    }
    HP = Math.ceil(Math.ceil(HP) * modifier);
    STR = Math.ceil(Math.ceil(STR) * modifier);
    might = calcMight(section, item, HP, STR);
  }
  return { HP, STR, might };
}


const updateStats = (details, stats, section) => {
  if (!stats[section]) {
    return { ...details, [section]: { HP: 0, STR: 0, might: 0 } };
  } else {
    let modifier = 1;
    if ((section === "weapon" || section === "dragon") && stats.adventurer && stats[section].element === stats.adventurer.element) {
      modifier = 1.5;
    }

    return { ...details, [section]: calcDetail(section, stats[section], modifier) };
  }
}

const calcFacility = (detail, ...facilities) => {
  let HP = 0, STR = 0;
  let HP_facility = 0, STR_facility = 0;
  for (const f of facilities) {
    if (f.hasOwnProperty("HP")) HP_facility += f.HP;
    if (f.hasOwnProperty("STR")) STR_facility += f.STR;
  }
  if (detail.hasOwnProperty("HP")) HP = Math.ceil(detail.HP * HP_facility * 0.01);
  if (detail.hasOwnProperty("STR")) STR = Math.ceil(detail.STR * STR_facility * 0.01);
  return { HP, STR };
}


const updateHalidom = (details, stats, halidom) => {
  let HP = 0, STR = 0;
  let facility = null;

  if (halidom.element) {
    const element = getHalidomValue(halidom.element);
    const weapon = getHalidomValue(halidom.weapon);
    facility = calcFacility(details.adventurer, element, weapon);
    HP = facility.HP;
    STR = facility.STR;
  }
  if (halidom.dragon) {
    // const dragonDetail = calcDetail("dragon", stats.dragon);
    const dragon = getHalidomValue(halidom.dragon);
    // facility = calcFacility(dragonDetail, dragon);
    facility = calcFacility(details.dragon, dragon);
    HP += facility.HP;
    STR += facility.STR;
  }

  return { ...details, halidom: { HP, STR, might: HP + STR } };
}

const updateAbility = (details, stats) => {
  let prevHP = 0, prevSTR = 0;
  for (const i in details) {
    if (i !== "ability" && details.hasOwnProperty(i)) {
      prevHP += details[i].HP;
      prevSTR += details[i].STR;
    }
  }
  let HP = 0, STR = 0;
  const { adventurer, dragon } = stats;
  if (adventurer && dragon && adventurer.element === dragon.element) {
    const abilityName = dragon.unbind === "4" ? "ability2" : "ability1";
    HP = Math.ceil(prevHP * dragon[abilityName].HP * 0.01);
    STR = Math.ceil(prevSTR * dragon[abilityName].STR * 0.01);
  }
  return { ...details, ability: { HP, STR, might: 0 } };
}

const updateDetails = (details, stats, halidom, section) => {
  switch (section) {
    case "halidom":
      return updateHalidom(details, stats, halidom);
    case "adventurer":
    case "weapon":
    case "wyrmprint1":
    case "wyrmprint2":
    case "dragon":
      return updateStats(details, stats, section);
    case "ability":
      return updateAbility(details, stats);
    default:
      return details;
  }
}

const resetDetails = (details) => {
  let new_details = { ...details };
  for (const d in details) {
    if (details.hasOwnProperty(d)) {
      new_details = { ...new_details, [d]: { HP: 0, STR: 0, might: 0 } };
    }
  }
  return new_details;
}

const detailReducer = (details, stats, halidom, action) => {
  if (action.type === actionTypes.UPDATE_DETAILS) {
    return updateDetails(details, stats, halidom, action.section);
  } else if (action.type === actionTypes.RESET_DETAILS) {
    return resetDetails(details);
  }
  return details;
}

export default detailReducer;