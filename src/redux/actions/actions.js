import actionTypes from './actionType';
import LEVEL_LIMIT from '../store/data/level_data';
import facilities from '../store/data/facility_data';
//simple action creator
const actionCreator = (type, ...argNames) => {
  return (...args) => {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[arg] = args[index];
    });
    return action;
  }
}

export const getLevelLimit = (key, rarity, unbind = 4) => {
  switch (key) {
    case "mana":
    case "adventurer":
      return LEVEL_LIMIT[key][rarity];
    case "facility":
      return 30;
    default:
      return LEVEL_LIMIT[key][rarity][unbind];
  }
}



//modify details pannel show/hide
export const toggleDetails = actionCreator(actionTypes.TOGGLE_DETAILS);
const hideDetails = actionCreator(actionTypes.HIDE_DETAILS);

//modify filters
export const resetFilters = actionCreator(actionTypes.RESET_FILTERS);
export const setFilters = actionCreator(actionTypes.SET_FILTERS, "key", "value");
const setFiltersAdventurerType = actionCreator(actionTypes.SET_FILTERS_ADVENTURER_TYPE);
const setFiltersWeaponType = actionCreator(actionTypes.SET_FILTERS_WEAPON_TYPE);
const setFiltersDragonElement = actionCreator(actionTypes.SET_FILTERS_DRAGON_ELEMENT);

//modify section
const setSection = actionCreator(actionTypes.SET_SECTION, "section")
export const handleSection = (section, statusSets) => (dispatch) => {
  const { adventurer, weapon } = statusSets;
  if (section === "adventurer" && weapon) {
    dispatch(setFiltersAdventurerType());
  } else if (section === "weapon" && adventurer) {
    dispatch(setFiltersWeaponType());
  } else if (section === "dragon" && adventurer) {
    dispatch(setFiltersDragonElement());
  } else {
    dispatch(resetFilters());
  }

  dispatch(hideDetails());
  dispatch(setSection(section));
  if (statusSets[section]) dispatch(removeStatus(section));
}

//modify status
const removeStatus = actionCreator(actionTypes.REMOVE_STATUS, "section");
const selectStatus = actionCreator(actionTypes.SELECT_STATUS, "section", "status");
export const handleSelection = (section, status) => (dispatch) => {
  // const state = getState()
  // console.log(state)
  const { Id, rarity, unbind, img } = status;
  let addtional = {};

  if (section === "adventurer") {
    addtional = { img: `${section}/${Id}_r0${rarity}.png`, curRarity: rarity, mana: getLevelLimit("mana", rarity) };
  } else if (section === "wyrmprint") {
    addtional = { img: `${section}/${Id}_02.png`, unbind: 4 };
  } else {
    addtional = { img: `${section}/${img}`, unbind: 4 };
  }

  dispatch(selectStatus(section, { ...status, ...addtional, level: getLevelLimit(section, rarity, unbind) }));
}
export const updateStatusLevel = actionCreator(actionTypes.UPDATE_STATUS_LEVEL, "section", "key", "value", "facilityType");
export const updateStatusUnbind = actionCreator(actionTypes.UPDATE_STATUS_UNBIND, "section", "value");
export const updateStatusAdventurerRarityMana = actionCreator(actionTypes.UPDATE_STATUS_ADVENTURER_RARITY_MANA, "key", "value");


//calc Status
const updateDetails = actionCreator(actionTypes.UPDATE_DETAILS, "details");

export const handleDetails = (statusSets) => (dispatch) => {
  const details = calcDetails(statusSets);
  dispatch(updateDetails(details));
}

const calcStats = (section, status, key, modifier = 1) => {
  let stats = 0;
  if (status) {
    let level = parseInt(status.level, 10);
    if (!level || level < 1) level = 1;
    let steps, statGain;
    switch (section) {
      case "adventurer": {
        steps = (status["Max" + key] - status["Min" + key + "5"]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = status["Min" + key + status.curRarity] + statGain + getManaBonus(status, key);
        break;
      }
      case "weapon":
      case "wyrmprint":
      case "dragon":
        steps = (status["Max" + key] - status["Min" + key]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = Math.ceil(status["Min" + key] + statGain) * modifier;
        break;
      default:
        break;
    }
    stats = Math.ceil(stats)
  }
  return stats;
}

const getManaBonus = (status, key) => {
  const mana = status.mana.toString();
  const index = ["50", "45", "40", "30", "20", "10", "0"].indexOf(mana);
  const statArray = [
    status["McFullBonus" + key + "5"],
    status["Plus" + key + "4"],
    status["Plus" + key + "3"],
    status["Plus" + key + "2"],
    status["Plus" + key + "1"],
    status["Plus" + key + "0"],
    0,
  ]
  return statArray.slice(index).reduce((acc, cur) => acc + cur);
}

const calcDetails = (statusSets) => {
  const details = {};
  let modifier, HP, STR;
  const { adventurer, dragon, facility } = statusSets;

  ["adventurer", "weapon", "wyrmprint", "dragon"].forEach(section => {
    modifier = 1
    HP = 0;
    STR = 0;
    if (statusSets[section]) {
      if (["weapon", "dragon"].includes(section) && adventurer) {
        if (statusSets[section].element === adventurer.element) {
          modifier = 1.5;
        }
      }
      HP = calcStats(section, statusSets[section], "HP", modifier);
      STR = calcStats(section, statusSets[section], "STR", modifier);
    }
    details[section] = { HP, STR };
  })

  let adventurer_HP_percent = 0,
    adventurer_STR_percent = 0,
    dragon_HP_percent = 0,
    dragon_STR_percent = 0;

  facility.typeList.forEach(type => {
    facility[type].contentList.forEach(item => {
      let level = facility[type][item];
      const { HP = 0, STR = 0 } = facilities[type][level] || {};
      if (type === "statue") {
        dragon_HP_percent = dragon_HP_percent + HP;
        dragon_STR_percent = dragon_STR_percent + STR;
      } else {
        adventurer_HP_percent = adventurer_HP_percent + HP;
        adventurer_STR_percent = adventurer_STR_percent + STR;
      }
    })
  })

  details.facility = {
    HP: Math.ceil(details.adventurer.HP * adventurer_HP_percent / 100) + Math.ceil(calcStats("dragon", dragon, "HP") * dragon_HP_percent / 100),
    STR: Math.ceil(details.adventurer.STR * adventurer_STR_percent / 100) + Math.ceil(calcStats("dragon", dragon, "STR") * dragon_STR_percent / 100)
  }

  let subtotal_HP = 0, subtotal_STR = 0;
  Object.keys(details).forEach(field => {
    subtotal_HP = subtotal_HP + details[field].HP;
    subtotal_STR = subtotal_STR + details[field].STR;
  })

  HP = 0;
  STR = 0;
  if (adventurer && dragon && adventurer.element === dragon.element) {
    const ability = (dragon.unbind === 4) ? "Abilities12" : "Abilities11";
    if (dragon[ability].attr === "HP") {
      HP = Math.ceil((dragon[ability].value / 100) * subtotal_HP);
    } else if (dragon[ability].attr === "Strength") {
      STR = Math.ceil((dragon[ability].value / 100) * subtotal_STR);
    } else if (dragon[ability].attr === "both") {
      HP = Math.ceil((dragon[ability].value / 100) * subtotal_HP);
      STR = Math.ceil((dragon[ability].value / 100) * subtotal_STR);
    }
  }

  details.ability = { HP, STR };
  details.total = {
    HP: subtotal_HP + HP,
    STR: subtotal_STR + STR,
  }
  return details;
}
