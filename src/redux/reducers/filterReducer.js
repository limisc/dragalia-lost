import actionTypes from '../actions/actionTypes';
import { updateObject, createReducer } from '../actions/actions';

const INIT_FILTERS = {
  weaponType: "",
  rarity: "",
  element: "",
  tier: "",
}

const resetFilters = () => {
  return updateObject(INIT_FILTERS);
}


const setFilters = (state, action) => {
  //action: { key, value }
  return updateObject(state, { [action.key]: action.value });
}


const setFiltersAdventurerWeaponType = (state, filter, stats) => {
  return updateObject(INIT_FILTERS, { weaponType: stats.weapon.weaponType });
}


const setFiltersWeaponType = (state, filter, stats) => {
  return updateObject(INIT_FILTERS, { weaponType: stats.adventurer.weaponType });
}


const setFiltersDragonElement = (state, filter, stats) => {
  return updateObject(INIT_FILTERS, { element: stats.adventurer.element });
}

const filterReducer = createReducer({}, {
  [actionTypes.RESET_FILTERS]: resetFilters,
  [actionTypes.SET_FILTERS]: setFilters,
  [actionTypes.SET_FILTERS_ADVENTURER_WEAPON_TYPE]: setFiltersAdventurerWeaponType,
  [actionTypes.SET_FILTERS_WEAPON_TYPE]: setFiltersWeaponType,
  [actionTypes.SET_FILTERS_DRAGON_ELEMENT]: setFiltersDragonElement,
})

export default filterReducer;