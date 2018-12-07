// import statusReducer from './statusReducer';
// import selectReducer from './selectReducer';
import actionTypes from '../actions/actionType';
import LEVEL_LIMIT from '../store/data/level_data';
import EXTRA_FACILITY from '../store/data/extraFacility';

const RESET_FILTER = {
  type: "",
  rarity: "",
  element: "",
  tier: "",
}

const RESET_FACILITY = {
  typeList: ["altar", "dojo"],
  type: "",
  element: "",
  altar: {
    contentList: ["altar1", "altar2"],
    altar1: 30,
    altar2: 30,
  },
  dojo: {
    contentList: ["dojo1", "dojo2"],
    dojo1: 30,
    dojo2: 30,
  }
}

const sectionReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SECTION: {
      return action.section;
    }
    default: return state;
  }
}

const filterReducer = (state, action, statusSets) => {
  switch (action.type) {
    case actionTypes.RESET_FILTERS: {
      return RESET_FILTER;
    }
    case actionTypes.SET_FILTERS_ADVENTURER_TYPE: {
      return {
        ...RESET_FILTER,
        type: statusSets.weapon.type,
      }
    }
    case actionTypes.SET_FILTERS_WEAPON_TYPE: {
      return {
        ...RESET_FILTER,
        type: statusSets.adventurer.type,
      }
    }
    case actionTypes.SET_FILTERS_DRAGON_ELEMENT: {
      return {
        ...RESET_FILTER,
        element: statusSets.adventurer.element,
      }
    }
    case actionTypes.SET_FILTERS: {
      return {
        ...state,
        [action.key]: action.value,
      }
    }
    default: return state;
  }
}


const statusReducer = (state, action) => {
  const { section } = action;
  switch (action.type) {
    case actionTypes.SELECT_STATUS: {
      // action: { section, status }
      const { status } = action;
      const { type, element } = status;
      let new_state = { ...state, [section]: status }
      /*************************************************************************************************/
      if (section === "adventurer") {
        let facility = { ...RESET_FACILITY, type, element };
        //if status[element/type] === state.facility[element/type], then keep the value, otherwise reset.
        if (element === state.facility.element) {
          facility = { ...facility, altar: state.facility.altar };
        }
        if (type === facility.type) {
          facility = { ...facility, dojo: state.facility.dojo };
        }

        //if status.element has extra facility, then add it.
        if (EXTRA_FACILITY[element]) {
          const { typeList, ...rest } = EXTRA_FACILITY[element];
          facility = { ...facility, typeList: [...facility.typeList, ...typeList], ...rest };
        }

        new_state = { ...new_state, facility };
      }
      /*************************************************************************************************/


      /**************************************************************************************************/
      //if adventurer & weapon type are different, then remove the one previous selected, but keep recent one.
      const checkArray = ["adventurer", "weapon"];
      const index = checkArray.indexOf(section);
      if (index !== -1) {
        const checkSection = checkArray[1 - index];
        const { [checkSection]: checkStatus } = state;
        if (checkStatus && checkStatus.type !== type) {
          new_state = { ...new_state, [checkSection]: null }
        }
      }
      /**************************************************************************************************/
      return new_state;
    }
    case actionTypes.REMOVE_STATUS: {
      return { ...state, [section]: null }
    }
    case actionTypes.UPDATE_STATUS_LEVEL: {
      // action: { section, key, value, [facilityType] }
      const { [section]: status } = state;
      const { curRarity, rarity, unbind } = status;
      const limit = getLevelLimit(section, curRarity || rarity, unbind);
      let value = parseInt(action.value, 10) || "";
      value = value > limit ? limit : value;

      return {
        ...state,
        [section]: {
          ...status,
          [action.key]: value,
        }
      }

    }
    case actionTypes.UPDATE_STATUS_UNBIND: {
      const { value } = action;
      const { [section]: status } = state;
      let { rarity, unbind, level, img } = status;
      unbind = unbind + value;
      if (unbind < 0) {
        unbind = 0;
      } else if (unbind > 4) {
        unbind = 4;
      }
      if (section === "wyrmprint") {
        img = unbind < 2 ? (img.slice(0, -5) + "1.png") : (img.slice(0, -5) + "2.png");
      }
      const limit = getLevelLimit(section, rarity, unbind);
      level = parseInt(level, 10) > limit ? limit : level;
      return {
        ...state,
        [section]: {
          ...status,
          unbind,
          level,
          img,
        }
      }
    }
    case actionTypes.UPDATE_STATUS_ADVENTURER_RARITY_MANA: {
      const { key, value } = action;
      let { level, mana, img } = state.adventurer;

      let new_state = { ...state, adventurer: { ...state.adventurer, [key]: value } }
      if (key === "curRarity") {
        //curRarity: value
        const levelLimit = getLevelLimit("adventurer", value);
        const manaLimit = getLevelLimit("mana", value);
        level = parseInt(level, 10) > levelLimit ? levelLimit : level;
        mana = parseInt(mana, 10) > manaLimit ? manaLimit : mana;
        img = img.slice(0, -5) + value + ".png";
        new_state = { ...new_state, adventurer: { ...new_state.adventurer, level, mana, img } };
      }
      return new_state;
    }
    default: return state;
  }
}

const getLevelLimit = (key, rarity, unbind = 4) => {
  switch (key) {
    case "mana":
    case "adventurer":
      return LEVEL_LIMIT[key][rarity];
    case "facility":
      return 30;
    default:
      return LEVEL_LIMIT[key][rarity][unbind];
  }
}



const rootReducer = (state, action) => {
  return {
    selectedSection: sectionReducer(state.selectedSection, action),
    filters: filterReducer(state.filters, action, state.statusSets),
    statusSets: statusReducer(state.statusSets, action),
    UIData: state.UIData,
  }
}

export default rootReducer;