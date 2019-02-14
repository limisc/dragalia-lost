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

const calcDetail = (section, item, modifier = 1) => {
  const detail = { HP: 0, STR: 0 };
  if (item) {
    let level = parseInt(item.level, 10);
    if (!level || level < 1) level = 1;

    for (const key in detail) {
      if (detail.hasOwnProperty(key)) {
        let stats = 0;
        if (level === item.MAX_LEVEL) {
          stats = item["Max" + key];
        } else {
          let steps, stepMin, statsMin, statsGain;
          if (section === "adventurer") {
            stepMin = "Min" + key + "5";
            statsMin = "Min" + key + item.curRarity;
          } else {
            stepMin = "Min" + key;
            statsMin = stepMin;
          }

          if (level === 1) {
            stats = item[statsMin];
          } else {
            steps = (item["Max" + key] - item[stepMin]) / (item.MAX_LEVEL - 1);
            statsGain = (level - 1) * steps;
            stats = item[statsMin] + statsGain;
          }
        }

        if (section === "adventurer") {
          stats = stats + getManaBonus(item, key);
        }
        detail[key] = Math.ceil(Math.ceil(stats) * modifier);
      }
    }
  }
  return detail;
}

const updateStats = (details, stats, section) => {
  if (!stats[section]) {
    return { ...details, [section]: { HP: 0, STR: 0 } };
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
    const dragonDetail = calcDetail("dragon", stats.dragon);
    const dragon = getHalidomValue(halidom.dragon);
    facility = calcFacility(dragonDetail, dragon);
    HP += facility.HP;
    STR += facility.STR;
  }

  return { ...details, halidom: { HP, STR } };
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
    const abilityName = dragon.unbind === 4 ? "Abilities12" : "Abilities11";
    HP = Math.ceil(prevHP * dragon[abilityName].HP * 0.01);
    STR = Math.ceil(prevSTR * dragon[abilityName].STR * 0.01);
  }
  return { ...details, ability: { HP, STR } };
}

const updateDetails = (details, stats, halidom, section) => {
  switch (section) {
    case "halidom":
      return updateHalidom(details, stats, halidom);
    case "adventurer":
    case "weapon":
    case "wyrmprint":
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
      new_details = { ...new_details, [d]: { HP: 0, STR: 0 } };
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