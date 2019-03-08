// @flow
import { actionTypes } from "actions";
// import { state } from "store";

const selectStats = (stats, action) => {
  const { statsKey, item } = action;
  const { adventurer, weapon } = stats;
  let updates = {};
  if (
    statsKey === "adventurer"
    && weapon
    && weapon.type !== item.type
  ) {
    updates = { weapon: null };
  } else if (
    statsKey === "weapon"
    && adventurer
    && adventurer.type !== item.type
  ) {
    updates = { adventurer: null };
  }

  return {
    ...stats,
    ...updates,
    [statsKey]: item,
  };
}

const statsReducer = (stats, action) => {
  if (action.type === actionTypes.SELECT_STATS) {
    return selectStats(stats, action);
  }

  return stats;
}

export default statsReducer;
/*import actionTypes from '../actions/actionTypes';
import { getStatsLimit, reducerCreator } from '../actions/actions';
import state from "../store/state";

const resetStats = () => {
  return { ...state.stats };
}

const selectStats = (stats, action) => {
  const { section, item } = action;
  const { adventurer, weapon } = stats;


  if (section === "adventurer" && weapon && weapon.type !== item.type) {
    return { ...stats, adventurer: item, weapon: null };
  } else if (section === "weapon" && adventurer && adventurer.type !== item.type) {
    return { ...stats, weapon: item, adventurer: null };
  } else {
    return { ...stats, [section]: item };
  }
}

const setValue = (value, section, rarity, unbind) => {
  const limit = getStatsLimit(section, rarity, unbind);
  let new_value = parseInt(value, 10) || "";
  if (new_value > limit) new_value = limit;
  return new_value.toString();
}

const updateLevel = (stats, action) => {
  const { section, value } = action;
  const { rarity, unbind, curRarity } = stats[section];
  const level = setValue(value, section, curRarity || rarity, unbind);
  return { ...stats, [section]: { ...stats[section], level } };
}

const updateRarity = (stats, action) => {
  const { section, value } = action;
  const item = stats[section];
  const level = getStatsLimit(section, value);
  const mana = setValue(item.mana, "mana", value);
  const EX = value !== "5" ? "0" : item.EX;
  return { ...stats, [section]: { ...item, curRarity: value, level, mana, EX } };
}

const updateMana = (stats, action) => {
  const { section, value } = action;
  let { EX } = stats[section];
  if (value === "50") {
    EX = "4";
  }
  return { ...stats, [section]: { ...stats[section], mana: value, EX } };
}

const updateUnbind = (stats, action) => {
  const { section, value } = action;
  const item = stats[section];

  // const unbind = parseInt(value, 10);
  const level = getStatsLimit(section, item.rarity, value);
  let updateSection = { ...item, unbind: value, level };
  return { ...stats, [section]: updateSection };
}

const updateEX = (stats, action) => {
  const { section, value } = action;
  let { mana } = stats[section];
  if (mana === "50" && value !== "4") {
    mana = "45";
  }
  return { ...stats, [section]: { ...stats[section], mana, EX: value } };
}

const updateBond = (stats, action) => {
  const { section, value } = action;
  let bond = parseInt(value, 10) || "";
  if (bond > 30) bond = 30;
  return { ...stats, [section]: { ...stats[section], bond } };
}

const statsCreator = (handler) => {
  return (stats, action) => {
    if (handler.hasOwnProperty(action.key)) {
      return handler[action.key](stats, action);
    } else {
      return stats;
    }
  };
}

const updateStats = statsCreator({
  level: updateLevel,
  curRarity: updateRarity,
  mana: updateMana,
  unbind: updateUnbind,
  EX: updateEX,
  bond: updateBond,
});

const statsReducer = reducerCreator({
  [actionTypes.RESET_STATS]: resetStats,
  [actionTypes.SELECT_STATS]: selectStats,
  [actionTypes.UPDATE_STATS]: updateStats,
});

export default statsReducer;
*/
