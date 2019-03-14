/* eslint-disable no-unused-vars */
import {
  actionTypes,
  getItem,
  parseSearch,
  reducerCreator,
} from "actions";
import {
  history,
  state,
} from "store";

const syncStats = (_, action) => {
  const { search } = action;
  const stats = parseSearch(search);
  const {
    adventurer,
    weapon,
    wyrmprint1,
    wyrmprint2,
  } = stats;

  if (
    adventurer
    && weapon
    && adventurer.type !== weapon.type
  ) {
    stats.weapon = null;
  }

  if (
    wyrmprint1
    && wyrmprint2
    && wyrmprint1.Id === wyrmprint2.Id
  ) {
    stats.wyrmprint2 = null;
  }

  const newStats = {
    ...state.stats,
    ...stats,
  };

  return newStats;
}

const updateStats = (statsKey, item, stats) => {
  const updates = {};
  if (item) {
    const {
      adventurer,
      weapon,
      wyrmprint1,
      wyrmprint2,
    } = stats;
    if (statsKey === "adventurer") {
      const equipment = {
        Flame: "400072_0",
        Water: "400121_0",
      };

      const { element } = item;
      const id = equipment[element];
      if (id) {
        const wyrmprint = getItem("wyrmprint", id);
        const { Id: id1 } = wyrmprint1 || {};
        const { Id: id2 } = wyrmprint2 || {};
        if (id !== id1 && id !== id2) {
          if (!wyrmprint1 || wyrmprint2) {
            updates.wyrmprint1 = wyrmprint;
          } else {
            updates.wyrmprint2 = wyrmprint;
          }
        }
      }

      if (weapon && weapon.type !== item.type) {
        updates.weapon = null;
      }
    } else if (
      statsKey === "weapon"
      && adventurer
      && adventurer.type !== item.type
    ) {
      updates.adventurer = null;
    } else if (statsKey === "wyrmprint1" || statsKey === "wyrmprint2") {
      const complement = {
        wyrmprint1: "wyrmprint2",
        wyrmprint2: "wyrmprint1",
      };
      const wyrmprint = stats[complement[statsKey]];
      if (wyrmprint && wyrmprint.Id === item.Id) {
        updates[complement[statsKey]] = null;
      }
    }
  }
  return updates;
}

const selectStats = (stats, action) => {
  const { statsKey, item } = action;
  const { [statsKey]: target } = stats;
  // stop select same item.
  if (
    target
    && item
    && target.Id === item.Id
  ) {
    return stats;
  }

  const updates = updateStats(statsKey, item, stats);
  return {
    ...stats,
    ...updates,
    [statsKey]: item,
  };
}

const statsReducer = reducerCreator({
  [actionTypes.SYNC_STATS]: syncStats,
  [actionTypes.SELECT_STATS]: selectStats,
});

export default statsReducer;