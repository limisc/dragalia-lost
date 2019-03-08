import {
  actionTypes,
  reducerCreator,
} from "actions";

import state from "store/state";

const INIT_FILTERS = {
  ...state.filters,
};

const selectFilters = (filters, action) => {
  return {
    ...filters,
    [action.key]: action.value
  };
}

const narrowFilters = (_, action, stats) => {
  const { statsKey } = action;
  const { adventurer, weapon } = stats;
  let updates = {};
  if (statsKey === "adventurer" && weapon) {
    updates = { type: weapon.type };
  } else if (statsKey === "weapon" && adventurer) {
    updates = { type: adventurer.type };
  } else if (statsKey === "dragon" && adventurer) {
    updates = { element: adventurer.element };
  }

  return {
    ...INIT_FILTERS,
    ...updates,
  };
}


const filterReducer = reducerCreator({
  [actionTypes.SELECT_FILTERS]: selectFilters,
  [actionTypes.NARROW_FILTERS]: narrowFilters,
});

export default filterReducer;
