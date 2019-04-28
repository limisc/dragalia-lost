import { actionTypes, reducerCreator } from '../actions';
import state from '../store/state';

const INIT_FILTERS = state.filters;

const resetFilters = () => INIT_FILTERS;

const selectFocus = (_, action, stats) => {
  const { statsKey } = action;
  const { adventurer, weapon } = stats;
  if (adventurer) {
    return {
      ...INIT_FILTERS,
      weapon: adventurer.weapon,
      element: adventurer.element,
    };
  } else if (statsKey === 'adventurer' && weapon) {
    return {
      ...INIT_FILTERS,
      weapon: weapon.weapon,
      element: weapon.element,
    };
  }

  return INIT_FILTERS;
};

const selectFilters = (filters, action) => {
  const { key, value } = action;
  if (filters[key] !== value) {
    return {
      ...filters,
      [action.key]: action.value,
    };
  }

  return filters;
};

const filterReducer = reducerCreator({
  [actionTypes.RESET_FILTERS]: resetFilters,
  [actionTypes.SELECT_FOCUS]: selectFocus,
  [actionTypes.SELECT_FILTERS]: selectFilters,
});

export default filterReducer;
