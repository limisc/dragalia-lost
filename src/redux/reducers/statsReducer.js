import actionTypes from '../actions/actionTypes';
import { getStatsLimit, reducerCreator } from '../actions/actions';

const selectStats = (stats, action) => {
  const { section, item } = action;
  const new_stats = { ...stats, [section]: item };

  //if adventurer & weapon weaponType are different, then remove the one previous selected, but keep recent one.
  const checkArray = ["adventurer", "weapon"];
  const index = checkArray.indexOf(section);
  if (index !== -1) {
    const checkSection = checkArray[1 - index];
    const checkItem = new_stats[checkSection];
    if (checkItem && checkItem.weaponType !== item.weaponType) {
      return { ...new_stats, [checkSection]: null };
    }
  }
  return new_stats;
}


const setValue = (value, section, rarity, unbind) => {
  const limit = getStatsLimit(section, rarity, unbind);
  let new_value = parseInt(value, 10) || "";
  if (new_value > limit) new_value = limit;
  return new_value;
}


const setMax = (section, rarity, unbind) => {
  return getStatsLimit(section, rarity, unbind);
}


const updateLevel = (stats, action) => {
  const { section, value } = action;
  const { rarity, unbind, curRarity } = stats[section];
  const level = setValue(value, section, curRarity || rarity, unbind);

  return { ...stats, [section]: { ...stats[section], level } }
}

const updateUnbind = (stats, action) => {
  const { section, value } = action;
  const item = stats[section];

  const unbind = parseInt(value, 10);
  const level = setMax(section, item.rarity, unbind);
  let updateSection = { ...item, unbind, level };

  if (section === "wyrmprint") {
    const image = unbind < 2 ? (item.image.slice(0, -5) + "1.png") : (item.image.slice(0, -5) + "2.png");
    updateSection = { ...updateSection, image };
  }

  return { ...stats, [section]: updateSection };
}

const updateMana = (stats, action) => {
  const { section, value } = action;
  return { ...stats, [section]: { ...stats[section], mana: value } };
}


const updateRarity = (stats, action) => {
  const { section, value } = action;
  const item = stats[section];
  const level = setMax(section, value);
  const mana = setValue(item.mana, "mana", value);
  const image = item.image.slice(0, -5) + value + ".png";
  return { ...stats, [section]: { ...item, curRarity: value, level, mana, image } };
}


const resetStats = () => {
  return {
    adventurer: null,
    weapon: null,
    wyrmprint: null,
    dragon: null,
  }
}

const statsCreator = (handler) => {
  return (stats, action) => {
    if (handler.hasOwnProperty(action.key)) {
      return handler[action.key](stats, action);
    } else {
      return stats;
    }
  }
}

const updateStats = statsCreator({
  level: updateLevel,
  unbind: updateUnbind,
  curRarity: updateRarity,
  mana: updateMana,
})


const statsReducer = reducerCreator({
  [actionTypes.SELECT_STATS]: selectStats,
  [actionTypes.RESET_STATS]: resetStats,
  [actionTypes.UPDATE_STATS]: updateStats,
})

export default statsReducer;