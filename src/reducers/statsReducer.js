
import {
  actionTypes,
  reducerCreator,
  getItem,
  getLimit,
  parseSearch,
} from "actions";
import { state } from "store";

const buildItem = (statsKey, item) => {
  if (item) {
    const rarity = statsKey === "adventurer" ? "5" : item.rarity;
    let result = {};
    const level = getLimit(statsKey, rarity);

    switch (statsKey) {
      case "adventurer":
        result = {
          curRarity: rarity,
          mana: "50",
          ex: "4",
        };
        break;
      case "dragon":
        result = {
          bond: "30",
          unbind: "4",
        };
        break;
      default:
        result.unbind = "4";
        break;
    }

    return {
      ...item,
      ...result,
      level,
    };
  }

  return item;
}

const syncStats = (_, action) => {
  const { search } = action;
  const stats = parseSearch(search);
  const {
    adventurer,
    weapon,
    wyrmprint1,
    wyrmprint2,
  } = stats;

  if (!adventurer) {
    return state.stats;
  }

  //if adventurer & weapon are different type, remove weapon.
  if (
    adventurer
    && weapon
    && adventurer.weapon !== weapon.weapon
  ) {
    stats.weapon = null;
  }

  //can't equipt same wyrmprint.
  if (
    wyrmprint1
    && wyrmprint2
    && wyrmprint1.id === wyrmprint2.id
  ) {
    stats.wyrmprint2 = null;
  }

  Object.keys(stats).forEach((k) => {
    stats[k] = buildItem(k, stats[k]);
  });

  return {
    ...state.stats,
    ...stats,
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
        const wyrmprint = buildItem("wyrmprint", getItem("wyrmprint", id));
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

  const newItem = buildItem(statsKey, item);
  return {
    ...stats,
    ...updates,
    [statsKey]: newItem,
  };
}

const updateStats = (stats, action) => {
  const { statsKey, updates } = action;

  return {
    ...stats,
    [statsKey]: {
      ...stats[statsKey],
      ...updates,
    },
  };
}
const statsReducer = reducerCreator({
  [actionTypes.SYNC_STATS]: syncStats,
  [actionTypes.SELECT_STATS]: selectStats,
  [actionTypes.UPDATE_STATS]: updateStats,
});

export default statsReducer;