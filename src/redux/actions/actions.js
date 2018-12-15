import actionTypes from './actionTypes';
import { LEVEL_LIMIT, HALIDOM_LIMIT } from '../store/data/level_data';

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

export const getStatsLimit = (section, rarity, unbind = 4) => {
  switch (section) {
    case "weapon":
    case "wyrmprint":
    case "dragon":
      return LEVEL_LIMIT[section][rarity][unbind];
    default:
      return LEVEL_LIMIT[section][rarity];
  }
}

export const getHalidomLimit = (field, type, label) => {
  if (!label) {
    return HALIDOM_LIMIT[field][type];
  }
  return HALIDOM_LIMIT[field][type][label];
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


export const capitalise = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


export const setLanguage = actionCreator(actionTypes.SET_LANGUAGE, "language");

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

//modify stats
const selectStats = actionCreator(actionTypes.SELECT_STATS, "section", "item");
const updateDetails = actionCreator(actionTypes.UPDATE_DETAILS, "section");

export const handleSelection = (section, item) => (dispatch) => {
  const { rarity, unbind = 4 } = item;
  const addState = { level: getStatsLimit(section, rarity, unbind) };
  if (section === "adventurer") {
    addState.mana = getStatsLimit("mana", rarity);
  } else if (section === "wyrmprint") {
    addState.image = item.image.slice(0, -5) + "2.png";
    addState.unbind = 4;
  } else {
    addState.unbind = 4;
  }
  dispatch(selectStats(section, updateObject(item, addState)));
  dispatch(updateDetails(section));
}


export const updateStatsValue = actionCreator(actionTypes.UPDATE_STATS_VALUE, "section", "key", "value", "field");

export const updateStats = (section, key, value, field) => (dispatch) => {
  dispatch(updateStatsValue(section, key, value, field));
  dispatch(updateDetails(section));
}
