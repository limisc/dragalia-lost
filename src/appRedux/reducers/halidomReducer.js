import {
  actionTypes,
  reducerCreator,
} from "actions";
import { facility } from "data";
import { state } from "store";

const syncHalidom = (halidom, action, stats) => {

  const updates = {};
  const { adventurer, dragon } = stats;
  if (adventurer) {
    const { element, weapon } = adventurer;
    updates.element = facility.element[element];
    updates.weapon = facility.weapon[weapon];
  }

  if (dragon) {
    const { element: dragonElement } = dragon;
    updates.dragon = facility.dragon[dragonElement];
  }

  return {
    ...state.halidom,
    ...updates,
  };
}

const selectHalidom = (halidom, action, stats) => {
  const { statsKey } = action;
  const { adventurer, dragon } = stats;

  if (statsKey === "adventurer") {
    if (adventurer) {
      const { element, weapon } = adventurer;
      const updates = {};
      if (!halidom.element || halidom.element.key !== element) {
        updates.element = facility.element[element];
      }

      if (!halidom.weapon || halidom.weapon.key !== weapon) {
        updates.weapon = facility.weapon[weapon];
      }

      if (!!Object.keys(updates)) {
        return {
          ...halidom,
          ...updates,
        };
      }
    } else {
      return {
        ...halidom,
        element: null,
        weapon: null,
      };
    }
  } else if (statsKey === "dragon") {
    if (dragon) {
      const { element } = dragon;
      if (!halidom.dragon || halidom.dragon.key !== element) {
        return {
          ...halidom,
          dragon: facility.dragon[element],
        };
      }
    } else {
      return {
        ...halidom,
        dragon: null,
      };
    }
  }

  return halidom;
}

const updateHalidom = (halidom, action) => {
  const { field, index, level } = action;
  return {
    ...halidom,
    [field]: {
      ...halidom[field],
      [index]: {
        ...halidom[field][index],
        level,
      },
    },
  };
}

const halidomReducer = reducerCreator({
  [actionTypes.SYNC_STATS]: syncHalidom,
  [actionTypes.SELECT_STATS]: selectHalidom,
  [actionTypes.UPDATE_HALIDOM]: updateHalidom,
});

export default halidomReducer;