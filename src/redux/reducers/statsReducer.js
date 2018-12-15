import actionTypes from '../actions/actionTypes';
import { getStatsLimit, getHalidomLimit, updateObject, createReducer } from '../actions/actions';

const setDefaultHalidom = (state, action) => {
  //element: MAX, weaponType: LV. 16, statue: 0,
  const { section, item } = action;
  let new_halidom = { ...state.halidom };
  let element, weaponType, statue;
  if (section === "adventurer") {
    if (!state[section] || state[section].element !== item.element) {
      element = getHalidomLimit("element", item.element);
      new_halidom = updateObject(new_halidom, { element });
    }

    if (!state[section] || state[section].weaponType !== item.weaponType) {
      weaponType = { HP: 16, STR: 16 };
      new_halidom = updateObject(new_halidom, { weaponType });
    }
  } else if (section === "dragon") {
    if (!state[section] || state[section].element !== item.element) {
      statue = { HP: "", STR: "" };
      new_halidom = updateObject(new_halidom, { statue });
    }
  }
  return new_halidom;
}

const updateStatsCreator = (initState, handlers) => {
  return (state = initState, action) => {
    if (handlers.hasOwnProperty(action.key)) {
      return handlers[action.key](state, action);
    } else {
      return state;
    }
  }
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


const updateLevel = (state, action) => {
  const { section, value } = action;
  const { [section]: item } = state;
  const { rarity, unbind, curRarity } = item;
  const level = setValue(value, section, curRarity || rarity, unbind);
  const updateSection = updateObject(item, { level })
  return updateObject(state, { [section]: updateSection });
}

const updateUnbind = (state, action) => {
  const { section, value } = action;
  const { [section]: item } = state;
  const { rarity } = item;

  const unbind = parseInt(value, 10);
  const level = setMax(section, rarity, unbind);
  let updateSection = updateObject(item, { unbind, level });
  if (section === "wyrmprint") {
    const image = unbind < 2 ? (item.image.slice(0, -5) + "1.png") : (item.image.slice(0, -5) + "2.png");
    updateSection = updateObject(updateSection, { image })
  }
  return updateObject(state, { [section]: updateSection });
}

const updateMana = (state, action) => {
  const { section, value } = action;
  const updateSection = updateObject(state[section], { mana: value });
  return updateObject(state, { [section]: updateSection });
}


const updateRarity = (state, action) => {
  const { section, value } = action;
  const { [section]: item } = state;
  const level = setMax(section, value);
  const mana = setValue(item.mana, "mana", value);
  const image = item.image.slice(0, -5) + value + ".png";
  const updateSection = updateObject(item, { curRarity: value, level, mana, image });
  return updateObject(state, { [section]: updateSection });
}

const updateHalidom = (state, action) => {
  let { section, field, key, value } = action;
  let type;
  if (field === "statue") {
    type = state.dragon.element;
  } else {
    type = state.adventurer[field];
  }
  const limit = getHalidomLimit(field, type, key);
  value = parseFloat(value) || "";
  if (value > limit) value = limit;
  return {
    ...state,
    [section]: {
      ...state[section],
      [field]: {
        ...state[section][field],
        [key]: value
      }
    }
  };
}



const forceSameWeaponType = (state, action) => {
  //if adventurer & weapon weaponType are different, then remove the one previous selected, but keep recent one.
  const checkArray = ["adventurer", "weapon"];
  const index = checkArray.indexOf(action.section);
  if (index !== -1) {
    const checkSection = checkArray[1 - index];
    const { [checkSection]: checkItem } = state;
    if (checkItem && checkItem.weaponType !== action.item.weaponType) {
      return updateObject(state, { [checkSection]: null });
    }
  }
  return state;
}



const selectStats = (state, action) => {
  // action = { section, item }
  const halidom = setDefaultHalidom(state, action);
  const new_state = updateObject(state, { [action.section]: action.item, halidom });
  return forceSameWeaponType(new_state, action);
}

const updateStatsValue = updateStatsCreator({}, {
  level: updateLevel,
  unbind: updateUnbind,
  curRarity: updateRarity,
  mana: updateMana,
  HP: updateHalidom,
  STR: updateHalidom,
});

const resetStats = () => {
  return {
    adventurer: null,
    weapon: null,
    wyrmprint: null,
    dragon: null,
    halidom: {
      element: { HP: "", STR: "" },
      weaponType: { HP: "", STR: "" },
      statue: { HP: "", STR: "" },
    }
  }
}

const statsReducer = createReducer({}, {
  [actionTypes.SELECT_STATS]: selectStats,
  [actionTypes.RESET_STATS]: resetStats,
  [actionTypes.UPDATE_STATS_VALUE]: updateStatsValue,
})

export default statsReducer;