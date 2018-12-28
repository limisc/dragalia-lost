import actionTypes from './actionTypes';
import LEVEL_LIMIT from '../store/data/level_data';
import { facility_value } from '../store/data/facility_data';
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


export const reducerCreator = (handler) => {
  return (state, action, ...args) => {
    if (handler.hasOwnProperty(action.type)) {
      return handler[action.type](state, action, ...args);
    } else {
      return state;
    }
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

export const getFacilityValue = (facility) => {
  let HP = 0, STR = 0;
  if (facility) {
    facility.id.forEach(id => {
      const { type, level } = facility[id];
      const value = facility_value[type][level];
      HP += value.HP;
      STR += value.STR;
    })
  }
  return { HP, STR };
}

export const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
}

export const setLanguage = actionCreator(actionTypes.SET_LANGUAGE, "language");

//modify filters
export const resetFilters = actionCreator(actionTypes.RESET_FILTERS);
export const setFilters = actionCreator(actionTypes.SET_FILTERS, "key", "value");
const setFiltersAdventurerWeaponType = actionCreator(actionTypes.SET_FILTERS_ADVENTURER_WEAPON_TYPE);
const setFiltersWeaponType = actionCreator(actionTypes.SET_FILTERS_WEAPON_TYPE);
const setFiltersDragonElement = actionCreator(actionTypes.SET_FILTERS_DRAGON_ELEMENT);

//modify section
export const setSection = actionCreator(actionTypes.SET_SECTION, "section")
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

export const updateHalidom = (facility, index, level) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_HALIDOM, facility, index, level });
  dispatch(updateDetails("halidom"));
}

export const defaultHalidom = () => (dispatch) => {
  dispatch({ type: actionTypes.DEFAULT_HALIDOM });
  dispatch(updateDetails("halidom"));
};

export const maxHalidom = () => (dispatch) => {
  dispatch({ type: actionTypes.MAX_HALIDOM });
  dispatch(updateDetails("halidom"));
};


const updateDetails = (section) => (dispatch) => {
  const handler = actionCreator(actionTypes.UPDATE_DETAILS, "section");
  dispatch(handler(section));
  switch (section) {
    case "adventurer":
      dispatch(handler("weaponType"));
      dispatch(handler("halidom"));
      break;
    case "weapon":
      dispatch(handler("adventurer"));
      dispatch(handler("halidom"));
      break;
    case "dragon":
      dispatch(handler("dragon"));
      break;
    default:
      break;
  }
  dispatch(handler("ability"));
}

export const handleSelection = (section, item) => (dispatch) => {
  const addState = { level: getStatsLimit(section, item.rarity) };
  if (section === "adventurer") {
    addState.mana = getStatsLimit("mana", item.rarity);
  } else if (section === "wyrmprint") {
    addState.image = item.image.slice(0, -5) + "2.png";
    addState.unbind = 4;
  } else {
    addState.unbind = 4;
  }

  //selectHalidom
  dispatch({ type: actionTypes.SELECT_HALIDOM, section, item });

  //selectStats
  dispatch({ type: actionTypes.SELECT_STATS, section, item: { ...item, ...addState } });

  dispatch(updateDetails(section));
}

export const updateStats = (section, key, value) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_STATS, section, key, value });
  dispatch(updateDetails(section));
}

export const resetAll = () => (dispatch) => {
  //reset section
  dispatch(setSection(null));

  //reset filters
  dispatch({ type: actionTypes.RESET_FILTERS });

  //reset stats
  dispatch({ type: actionTypes.RESET_STATS });

  //reset halidom
  dispatch({ type: actionTypes.RESET_HALIDOM });

  //reset details
  dispatch({ type: actionTypes.RESET_DETAILS });
};
