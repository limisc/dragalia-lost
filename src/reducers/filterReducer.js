import state from "store/state";
import {
  actionTypes,
  reducerCreator,
} from "actions";

const INIT_FILTERS = {
  ...state.filters,
};

const selectFilters = (filters, action) => {
  return {
    ...filters,
    [action.key]: action.value
  };
}

const narrowFilters = (filters, action, stats) => {
  const { statsKey } = action;
  const { adventurer, weapon } = stats;
  if (statsKey === "adventurer" && weapon) {
    return {
      ...INIT_FILTERS,
      weapon: weapon.weapon,
    };
  } else if (statsKey === "weapon" && adventurer) {
    return {
      ...INIT_FILTERS,
      weapon: adventurer.weapon,
    };
  } else if (statsKey === "dragon" && adventurer) {
    return {
      ...INIT_FILTERS,
      element: adventurer.element,
    };
  }

  return filters;
}

const filterReducer = reducerCreator({
  [actionTypes.SELECT_FILTERS]: selectFilters,
  [actionTypes.NARROW_FILTERS]: narrowFilters,
});

export default filterReducer;
