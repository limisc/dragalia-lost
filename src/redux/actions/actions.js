import actionTypes from './actionType';
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
export const updateDetails = actionCreator(actionTypes.UPDATE_DETAILS, "field", "value");