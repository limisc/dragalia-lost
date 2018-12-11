import actionTypes from './actionTypes';
import LEVEL_LIMIT from '../store/data/level_data';

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

export const getLevelLimit = (section, rarity, unbind = 4) => {
  switch (section) {
    case "weapon":
    case "wyrmprint":
    case "dragon":
      return LEVEL_LIMIT[section][rarity][unbind];
    default:
      return LEVEL_LIMIT[section][rarity];
  }
}

export const createReducer = (initState, handlers) => {
  return (state = initState, action, ...args) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action, ...args);
    } else {
      return state;
    }
  }
}

export const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
}

//modify filters
export const resetFilters = actionCreator(actionTypes.RESET_FILTERS);
export const setFilters = actionCreator(actionTypes.SET_FILTERS, "key", "value");
const setFiltersAdventurerWeaponType = actionCreator(actionTypes.SET_FILTERS_ADVENTURER_WEAPON_TYPE);
const setFiltersWeaponType = actionCreator(actionTypes.SET_FILTERS_WEAPON_TYPE);
const setFiltersDragonElement = actionCreator(actionTypes.SET_FILTERS_DRAGON_ELEMENT);

//modify section
const setSection = actionCreator(actionTypes.SET_SECTION, "section")
export const handleSection = (section) => (dispatch, getState) => {
  const state = getState();
  const { adventurer, weapon } = state.stats;

  dispatch(setSection(section));
  if (section === "adventurer" && weapon) {
    dispatch(setFiltersAdventurerWeaponType());
  } else if (section === "weapon" && adventurer) {
    dispatch(setFiltersWeaponType());
  } else if (section === "dragon" && adventurer) {
    dispatch(setFiltersDragonElement());
  } else {
    dispatch(resetFilters());
  }
}

//modify status
// const removeStatus = actionCreator(actionTypes.REMOVE_STATUS, "section");
const selectStats = actionCreator(actionTypes.SELECT_STATS, "section", "item");
export const handleSelection = (section, item) => (dispatch) => {
  const { rarity, unbind = 4 } = item;
  const addState = { level: getLevelLimit(section, rarity, unbind) };
  if (section === "adventurer") {
    addState.mana = getLevelLimit("mana", rarity);
  } else {
    addState.unbind = 4;
  }
  dispatch(selectStats(section, updateObject(item, addState)));
  // console.log(updateObject(item, addState))
}

export const updateStatsLevel = actionCreator(actionTypes.UPDATE_STATS_LEVEL, "section", "key", "value", "facilityType");
export const updateStatsUnbind = actionCreator(actionTypes.UPDATE_STATS_UNBIND, "section", "value");
export const updateStatsAdventurerRarityMana = actionCreator(actionTypes.UPDATE_STATS_ADVENTURER_RARITY_MANA, "key", "value");


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


    if (level === status.MAX_LEVEL) {
      stats = status["Max" + key];
    } else {
      if (section === "adventurer") {
        steps = (status["Max" + key] - status["Min" + key + "5"]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = status["Min" + key + status.curRarity] + statGain;
      } else {
        steps = (status["Max" + key] - status["Min" + key]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = status["Min" + key] + statGain;
      }
    }

    if (section === "adventurer") stats = stats + getManaBonus(status, key);
    stats = Math.ceil(Math.ceil(stats) * modifier);
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
      // const { HP = 0, STR = 0 } = facilities[type][level] || {};
      const HP = 0, STR = 0;
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
