/* eslint-disable no-unused-vars */
import {
  actionTypes,
  reducerCreator,
  getItem,
  parseSearch,
} from "actions";
import { state } from "store";

const syncStats = (stats, action) => {
  const { search } = action;
  const newStats = parseSearch(search);
  const {
    adventurer,
    weapon,
    wyrmprint1,
    wyrmprint2,
  } = newStats;

  //return clean stats if no adventurer.
  if (!adventurer) {
    return state.stats;
  }

  //if adventurer & weapon are different, remove weapon.
  if (
    adventurer
    && weapon
    && adventurer.weapon !== weapon.weapon
  ) {
    newStats.weapon = null;
  }

  //can't equipt same wyrmprint.
  if (
    wyrmprint1
    && wyrmprint2
    && wyrmprint1.id === wyrmprint2.id
  ) {
    newStats.wyrmprint2 = null;
  }

  return {
    ...state.stats,
    ...newStats,
  };
}

const selectStats = (stats, action) => {
  const { statsKey, item } = action;
  const { [statsKey]: target } = stats;
  // stop select same item.
  if (
    target
    && item
    && target.id === item.id
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
        const { id: id1 } = wyrmprint1 || {};
        const { id: id2 } = wyrmprint2 || {};
        if (id !== id1 && id !== id2) {
          if (!wyrmprint1 || wyrmprint2) {
            updates.wyrmprint1 = wyrmprint;
          } else {
            updates.wyrmprint2 = wyrmprint;
          }
        }
      }

      if (weapon && weapon.weapon !== item.weapon) {
        updates.weapon = null;
      }
    } else if (
      statsKey === "weapon"
      && adventurer
      && adventurer.weapon !== item.weapon
    ) {
      updates.adventurer = null;
    } else if (statsKey === "wyrmprint1" || statsKey === "wyrmprint2") {
      //can't equipt the same wyrmprint.
      const complement = {
        wyrmprint1: "wyrmprint2",
        wyrmprint2: "wyrmprint1",
      };
      const wyrmprint = stats[complement[statsKey]];
      if (wyrmprint && wyrmprint.id === item.id) {
        updates[complement[statsKey]] = null;
      }
    }
  }
  return updates;
}

const statsReducer = reducerCreator({
  [actionTypes.SYNC_STATS]: syncStats,
  [actionTypes.SELECT_STATS]: selectStats,
});

export default statsReducer;