import actionTypes from '../actions/actionTypes';
import { getFacilityValue } from '../actions/actions';

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
  ]
  return statArray.slice(index).reduce((acc, cur) => acc + cur);
}

const calcDetail = (section, item, modifier = 1) => {
  const detail = { HP: 0, STR: 0 };
  if (item) {
    let level = parseInt(item.level, 10);
    if (!level || level < 1) level = 1;
    let stats;
    Object.keys(detail).forEach(key => {
      stats = 0;
      if (level === item.MAX_LEVEL) {
        stats = item["Max" + key];
      } else {
        let steps, stepMin, statsMin, statGain;
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
          statGain = (level - 1) * steps;
          stats = item[statsMin] + statGain;
        }
      }
      if (section === "adventurer") stats = stats + getManaBonus(item, key);
      detail[key] = Math.ceil(Math.ceil(stats) * modifier);
    });
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
  for (let f of facilities) {
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
    const element = getFacilityValue(halidom.element);
    const weaponType = getFacilityValue(halidom.weaponType);
    facility = calcFacility(details.adventurer, element, weaponType);
    HP = facility.HP;
    STR = facility.STR;
  }
  if (halidom.fafnir) {
    const dragonDetail = calcDetail("dragon", stats.dragon);
    const fafnir = getFacilityValue(halidom.fafnir);
    facility = calcFacility(dragonDetail, fafnir);
    HP += facility.HP;
    STR += facility.STR;
  }

  return { ...details, halidom: { HP, STR } };
}

const updateAbility = (details, stats) => {
  let prevHP = 0, prevSTR = 0;
  for (let i in details) {
    if (i !== "ability" && details.hasOwnProperty(i)) {
      prevHP += details[i].HP;
      prevSTR += details[i].STR;
    }
  }
  let HP = 0, STR = 0;
  const { adventurer, dragon } = stats;
  if (adventurer && dragon && adventurer.element === dragon.element) {
    const abilityName = dragon.unbind === 4 ? "Abilities12" : "Abilities11";
    const { field, value } = dragon[abilityName];
    const calcValue = (base, modifier) => Math.ceil(base * modifier * 0.01);
    switch (field) {
      case "HP":
        HP = calcValue(prevHP, value);
        break;
      case "STR":
        STR = calcValue(prevSTR, value);
        break;
      case "BOTH":
        HP = calcValue(prevHP, value);
        STR = calcValue(prevSTR, value);
        break;

      default: break;
    }
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
  for (let d in details) {
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