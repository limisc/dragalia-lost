import {
  actionTypes,
  reducerCreator,
} from "actions";


// const resetHalidom = (halidom, action) => {
//   const { state: { element, weapon, dragon } } = action;
//   const updates = {};
//   if (!element) updates.element = null;
//   if (!weapon) updates.weapon = null;
//   if (!dragon) updates.dragon = null;

//   return {
//     ...halidom,
//     ...updates,
//   };
// }






// const halidomReducer = reducerCreator({
//   [actionTypes]
// })


// const halidomReducer = (halidom, action, stats) => {
//   const { type } = action;
//   if (type === actionTypes.AYNC_STATS || type === actionTypes.SELECT_STATS) {
//     let { element, weapon, dragon } = halidom;
//     if (!stats.adventurer) {
//       element = null;
//       weapon = null;
//     }

//     if (!stats.dragon) dragon = null;

//     if (!element || !weapon || !dragon) {
//       return {
//         element,
//         weapon,
//         dragon,
//       }
//     }
//   }




//   return halidom;
// }
// export default halidomReducer;