import state from "store/state";
import {
  actionTypes,
  reducerCreator,
} from "actions";

const INIT_FILTERS = {
  ...state.filters,
};

const selectFocus = (_, action, stats) => {
  const { statsKey } = action;
  const { adventurer, weapon } = stats;
  if (adventurer) {
    return {
      ...INIT_FILTERS,
      weapon: adventurer.weapon,
      element: adventurer.element,
    };
  } else if (statsKey === "adventurer" && weapon) {
    return {
      ...INIT_FILTERS,
      weapon: weapon.weapon,
    };
  }

  return INIT_FILTERS;
}

const selectFilters = (filters, action) => {
  return {
    ...filters,
    [action.key]: action.value
  };
}

const filterReducer = reducerCreator({
  [actionTypes.SELECT_FOCUS]: selectFocus,
  [actionTypes.SELECT_FILTERS]: selectFilters,
});

export default filterReducer;
