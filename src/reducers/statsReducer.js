import {
  actionTypes,
  getItem,
  parseSearch,
  reducerCreator,
} from "actions";
import {
  state,
} from "store";

const syncStats = (_, action) => {
  const stats = parseSearch(action.search);
  const { adventurer, weapon } = stats;
  if (
    adventurer
    && weapon
    && adventurer.type !== weapon.type
  ) {
    stats.weapon = null;
  }

  return {
    ...state.stats,
    ...stats,
  };
}



const selectStats = (stats, action) => {
  const { statsKey, item } = action;
  const { adventurer, weapon } = stats;
  const updates = {};
  if (item) {
    if (statsKey === "adventurer") {
      const equipment = {
        Flame: "400072_0",
        Water: "400121_0",
      };

      const { element } = item;
      if (equipment[element]) {
        updates["wyrmprint1"] = getItem("wyrmprint", equipment[element]);
      }

      if (weapon && weapon.type !== item.type) {
        updates["weapon"] = null;
      }
    } else if (
      statsKey === "weapon"
      && adventurer
      && adventurer.type !== item.type
    ) {
      updates["adventurer"] = null;
    }
  }
  return {
    ...stats,
    ...updates,
    [statsKey]: item,
  };
}

const statsReducer = reducerCreator({
  [actionTypes.AYNC_STATS]: syncStats,
  [actionTypes.SELECT_STATS]: selectStats,
});

export default statsReducer;
