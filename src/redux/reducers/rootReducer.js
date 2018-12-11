import actionTypes from '../actions/actionType';
import sectionReducer from './sectionReducer';
import filterReducer from './filterReducer';
import statsReducer from './statsReducer';
// const RESET_FILTER = {
//   type: "",
//   rarity: "",
//   element: "",
//   tier: "",
// }

// const RESET_FACILITY = {
//   typeList: ["altar", "dojo"],
//   type: "",
//   element: "",
//   altar: {
//     contentList: ["altar1", "altar2"],
//     altar1: 30,
//     altar2: 30,
//   },
//   dojo: {
//     contentList: ["dojo1", "dojo2"],
//     dojo1: 30,
//     dojo2: 30,
//   }
// }

// const detailsReducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.TOGGLE_DETAILS: {
//       return !state;
//     }
//     case actionTypes.HIDE_DETAILS: {
//       return false;
//     }
//     default: return state;
//   }
// }

// const sectionReducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.SET_SECTION: {
//       return action.section;
//     }
//     default: return state;
//   }
// }

// const filterReducer = (state, action, statusSets) => {
//   switch (action.type) {
//     case actionTypes.RESET_FILTERS: {
//       return RESET_FILTER;
//     }
//     case actionTypes.SET_FILTERS_ADVENTURER_TYPE: {
//       return {
//         ...RESET_FILTER,
//         type: statusSets.weapon.type,
//       }
//     }
//     case actionTypes.SET_FILTERS_WEAPON_TYPE: {
//       return {
//         ...RESET_FILTER,
//         type: statusSets.adventurer.type,
//       }
//     }
//     case actionTypes.SET_FILTERS_DRAGON_ELEMENT: {
//       return {
//         ...RESET_FILTER,
//         element: statusSets.adventurer.element,
//       }
//     }
//     case actionTypes.SET_FILTERS: {
//       return {
//         ...state,
//         [action.key]: action.value,
//       }
//     }
//     default: return state;
//   }
// }

// const statusReducer = (state, action) => {
//   const { section } = action;
//   switch (action.type) {
//     case actionTypes.SELECT_STATUS: {
//       // action: { section, status }
//       const { status } = action;
//       const { type, element } = status;
//       console.log(element)
//       let new_state = { ...state, [section]: status }
//       /*************************************************************************************************/
//       if (section === "adventurer") {
//         let facility = { ...RESET_FACILITY, type, element };
//         //if status[element/type] === state.facility[element/type], then keep the value, otherwise reset.
//         if (element === state.facility.element) {
//           facility = { ...facility, altar: state.facility.altar };
//         }
//         if (type === state.facility.type) {
//           facility = { ...facility, dojo: state.facility.dojo };

//         }
//         //if status.element has extra facility, then add it.
//         if (EXTRA_FACILITY[element]) {
//           const { typeList, ...rest } = EXTRA_FACILITY[element];
//           facility = { ...facility, typeList: [...facility.typeList, ...typeList], ...rest };
//         }

//         new_state = { ...new_state, facility };
//       } else if (section === "dragon" && !state.adventurer && EXTRA_FACILITY[element] && EXTRA_FACILITY[element].statue) {
//         let facility = { ...RESET_FACILITY, type, element };
//         const { statue } = EXTRA_FACILITY[element];
//         facility = { ...facility, typeList: [...facility.typeList, "statue"], statue };
//         new_state = { ...new_state, facility };
//       }
//       /*************************************************************************************************/


//       /**************************************************************************************************/
//       //if adventurer & weapon type are different, then remove the one previous selected, but keep recent one.
//       const checkArray = ["adventurer", "weapon"];
//       const index = checkArray.indexOf(section);
//       if (index !== -1) {
//         const checkSection = checkArray[1 - index];
//         const { [checkSection]: checkStatus } = state;
//         if (checkStatus && checkStatus.type !== type) {
//           new_state = { ...new_state, [checkSection]: null }
//         }
//       }
//       /**************************************************************************************************/
//       return new_state;
//     }
//     case actionTypes.REMOVE_STATUS: {
//       return { ...state, [section]: null }
//     }
//     case actionTypes.UPDATE_STATUS_LEVEL: {
//       // action: { section, key, value, [facilityType] }
//       const { key, facilityType } = action;
//       const { [section]: status } = state;
//       const { curRarity, rarity, unbind } = status;
//       const limit = getLevelLimit(section, curRarity || rarity, unbind);
//       let value = parseInt(action.value, 10) || "";
//       value = value > limit ? limit : value;
//       let new_status = {}
//       if (facilityType) {
//         new_status = { ...status, [facilityType]: { ...status[facilityType], [key]: value } }
//       } else {
//         new_status = { ...status, [key]: value }
//       }
//       return {
//         ...state,
//         [section]: new_status
//       }
//     }
//     case actionTypes.UPDATE_STATUS_UNBIND: {
//       // action: { section, value }
//       const { value } = action;
//       const { [section]: status } = state;
//       let { rarity, unbind, level } = status;
//       let new_status = {};
//       unbind = unbind + value;
//       if (unbind < 0) {
//         unbind = 0;
//       } else if (unbind > 4) {
//         unbind = 4;
//       }

//       const limit = getLevelLimit(section, rarity, unbind);
//       level = parseInt(level, 10) > limit ? limit : level;
//       new_status = { ...status, unbind, level };
//       if (section === "wyrmprint") {
//         const img = unbind < 2 ? (status.img.slice(0, -5) + "1.png") : (status.img.slice(0, -5) + "2.png");
//         new_status = { ...new_status, img };
//       }

//       return {
//         ...state,
//         [section]: new_status,
//       }
//     }
//     case actionTypes.UPDATE_STATUS_ADVENTURER_RARITY_MANA: {
//       const { key, value } = action;
//       let new_adventurer = { ...state.adventurer, [key]: value };
//       if (key === "curRarity") {
//         //curRarity: value
//         let { level, mana, img } = state.adventurer;
//         const levelLimit = getLevelLimit("adventurer", value);
//         const manaLimit = getLevelLimit("mana", value);
//         level = parseInt(level, 10) > levelLimit ? levelLimit : level;
//         mana = parseInt(mana, 10) > manaLimit ? manaLimit : mana;
//         img = img.slice(0, -5) + value + ".png";
//         new_adventurer = { ...new_adventurer, level, mana, img };
//       }
//       return { ...state, adventurer: new_adventurer };
//     }

//     default: return state;
//   }
// }

// const updateObject = (oldObject, ...newValues) => {
//   return Object.assign({}, oldObject, ...newValues);
// }


const rootReducer = (state, action) => {
  return {
    focusSection: sectionReducer(state.focusSection, action),
    filters: filterReducer(state.filters, action, state.stats),
    stats: statsReducer(state.stats, action),
    // details: statsReducer(state.details, action),
  }

}


export default rootReducer;