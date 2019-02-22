import { reducerCreator } from '../actions/actions';
import actionTypes from '../actions/actionTypes';
import state from '../store/state';
import * as facilities from '../actions/facility';

const resetHalidom = () => {
  return { ...state.halidom };
}

const defaultHalidom = (halidom) => {
  const LV = { element: 30, weapon: 16, dragon: 0 };
  let update = {};

  for (const f in halidom) {
    if (halidom.hasOwnProperty(f) && halidom[f]) {
      let facility = { ...halidom[f] };
      let item = null;
      for (const i of halidom[f].list) {
        const level = halidom[f][i].type === "slime" ? 15 : LV[f];
        item = { ...halidom[f][i], level }
        facility = { ...facility, [i]: item };
      }
      update = { ...update, [f]: facility };
    }
  }
  return { ...halidom, ...update };
}

const maxHalidom = (halidom) => {
  let update = {};
  for (const f in halidom) {
    if (halidom.hasOwnProperty(f) && halidom[f]) {
      let facility = { ...halidom[f] };
      let item = null;
      for (const i of halidom[f].list) {
        const level = halidom[f][i].type === "slime" ? 15 : 30;
        item = { ...halidom[f][i], level }
        facility = { ...facility, [i]: item };
      }
      update = { ...update, [f]: facility };
    }
  }
  return { ...halidom, ...update };
}

const selectHalidom = (halidom, action, stats) => {
  const { section, item } = action;
  const prevItem = stats[section];
  if (section === "adventurer") {
    let { element, weapon } = halidom;
    if (!prevItem) {
      element = facilities.element[item.element];
      weapon = facilities.weapon[item.type];
    } else {
      if (prevItem.element !== item.element) element = facilities.element[item.element];
      if (prevItem.type !== item.type) weapon = facilities.weapon[item.type];
    }
    return { ...halidom, element, weapon };
  } else if ((section === "dragon") && (!prevItem || prevItem.element !== item.element)) {
    return { ...halidom, dragon: facilities.dragon[item.element] };
  }
  return halidom;
}

const updateHalidom = (halidom, action) => {
  const { facility, index, level } = action;
  return {
    ...halidom,
    [facility]: {
      ...halidom[facility],
      [index]: {
        ...halidom[facility][index],
        level
      }
    }
  };
}

const halidomReducer = reducerCreator({
  [actionTypes.UPDATE_HALIDOM]: updateHalidom,
  [actionTypes.SELECT_HALIDOM]: selectHalidom,
  [actionTypes.RESET_HALIDOM]: resetHalidom,
  [actionTypes.DEFAULT_HALIDOM]: defaultHalidom,
  [actionTypes.MAX_HALIDOM]: maxHalidom,
});

export default halidomReducer;