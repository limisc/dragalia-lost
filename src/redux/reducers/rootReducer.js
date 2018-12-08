// import statusReducer from './statusReducer';
// import selectReducer from './selectReducer';
import actionTypes from '../actions/actionType';
import { getLevelLimit } from '../actions/actions';
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

const detailsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DETAILS: {
      return !state;
    }
    case actionTypes.HIDE_DETAILS: {
      return false;
    }
    default: return state;
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
        if (type === state.facility.type) {
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
      const { key, facilityType } = action;
      const { [section]: status } = state;
      const { curRarity, rarity, unbind } = status;
      const limit = getLevelLimit(section, curRarity || rarity, unbind);
      let value = parseInt(action.value, 10) || "";
      value = value > limit ? limit : value;
      let new_status = {}
      if (facilityType) {
        new_status = { ...status, [facilityType]: { ...status[facilityType], [key]: value } }
      } else {
        new_status = { ...status, [key]: value }
      }
      return {
        ...state,
        [section]: new_status
      }
    }
    case actionTypes.UPDATE_STATUS_UNBIND: {
      // action: { section, value }
      const { value } = action;
      const { [section]: status } = state;
      let { rarity, unbind, level } = status;
      let new_status = {};
      unbind = unbind + value;
      if (unbind < 0) {
        unbind = 0;
      } else if (unbind > 4) {
        unbind = 4;
      }

      const limit = getLevelLimit(section, rarity, unbind);
      level = parseInt(level, 10) > limit ? limit : level;
      new_status = { ...status, unbind, level };
      if (section === "wyrmprint") {
        const img = unbind < 2 ? (status.img.slice(0, -5) + "1.png") : (status.img.slice(0, -5) + "2.png");
        new_status = { ...new_status, img };
      }

      return {
        ...state,
        [section]: new_status,
      }
    }
    case actionTypes.UPDATE_STATUS_ADVENTURER_RARITY_MANA: {
      const { key, value } = action;
      let new_adventurer = { ...state.adventurer, [key]: value };
      if (key === "curRarity") {
        //curRarity: value
        let { level, mana, img } = state.adventurer;
        const levelLimit = getLevelLimit("adventurer", value);
        const manaLimit = getLevelLimit("mana", value);
        level = parseInt(level, 10) > levelLimit ? levelLimit : level;
        mana = parseInt(mana, 10) > manaLimit ? manaLimit : mana;
        img = img.slice(0, -5) + value + ".png";
        new_adventurer = { ...new_adventurer, level, mana, img };
      }
      return { ...state, adventurer: new_adventurer };
    }

    default: return state;
  }
}

const rootReducer = (state, action) => {
  return {
    showDetails: detailsReducer(state.showDetails, action),
    selectedSection: sectionReducer(state.selectedSection, action),
    filters: filterReducer(state.filters, action, state.statusSets),
    statusSets: statusReducer(state.statusSets, action),
  }
}

const calcStats = (section, status, key, modifier) => {
  let stats = 0;
  if (status) {
    let level = parseInt(status.level, 10);
    if (!level || level < 1) level = 1;
    let steps, statGain;
    switch (section) {
      case "adventurer": {
        steps = (status["Max" + key] - status["Min" + key + "5"]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = status["Min" + key + status.curRarity] + statGain + this.getManaBonus(status, key);
        break;
      }
      case "weapon":
      case "wyrmprint":
      case "dragon":
        steps = (status["Max" + key] - status["Min" + key]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = Math.ceil(status["Min" + key] + statGain) * modifier;
        break;
      default:
        break;
    }
    stats = Math.ceil(stats)
  }
  return stats;
}

const getManaBonus = (status, key) => {
  const mana = status.mana.toString();
  const index = ["50", "45", "40", "30", "20", "10", "0"].indexOf(mana);
  const statArray = [
    status["McFullBonus" + key + "5"],
    status["Plus" + key + "4"],
    status["Plus" + key + "3"],
    status["Plus" + key + "2"],
    status["Plus" + key + "1"],
    status["Plus" + key + "0"],
    0,
  ]
  return statArray.slice(index).reduce((acc, cur) => acc + cur);
}

export default rootReducer;