import { reducerCreator } from '../actions/actions';
import actionTypes from '../actions/actionTypes';
import state from '../store/state';

const INIT_FILTERS = { ...state.filters };

const resetFilters = () => {
  return INIT_FILTERS;
}

const selectFilters = (filters, action) => {
  return { ...filters, [action.key]: action.value };
}

const narrowDown = (_, action, stats) => {
  const { section } = action;
  const { adventurer, weapon } = stats;
  if (section === "adventurer" && weapon) {
    return { ...INIT_FILTERS, type: weapon.type };
  } else if (section === "weapon" && adventurer) {
    return { ...INIT_FILTERS, type: adventurer.type };
  } else if (section === "dragon" && adventurer) {
    return { ...INIT_FILTERS, element: adventurer.element };
  } else {
    return INIT_FILTERS;
  }
}


const filterReducer = reducerCreator({
  [actionTypes.RESET_FILTERS]: resetFilters,
  [actionTypes.SELECT_FILTERS]: selectFilters,
  [actionTypes.NARROW_DOWN_FILTERS]: narrowDown,
});

export default filterReducer;
