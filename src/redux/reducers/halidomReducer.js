import actionTypes from '../actions/actionTypes';
import { reducerCreator } from '../actions/actions';
import { altar, dojo, fafnir } from '../store/data/facility_data';

const selectHalidom = (halidom, action, stats) => {
  const { section, item } = action;
  const prevItem = stats[section];
  if (section === "adventurer") {
    let { element, weaponType } = halidom;
    if (!prevItem) {
      element = altar[item.element];
      weaponType = dojo[item.weaponType];
    } else {
      if (prevItem.element !== item.element) element = altar[item.element];
      if (prevItem.weaponType !== item.weaponType) weaponType = dojo[item.weaponType];
    }
    return { ...halidom, element, weaponType };
  } else if ((section === "dragon") && (!prevItem || prevItem.element !== item.element)) {
    return { ...halidom, fafnir: fafnir[item.element] };
  }
  return halidom;
}

const resetHalidom = () => {
  return {
    element: null,
    weaponType: null,
    fafnir: null,
  }
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

const defaultHalidom = (halidom) => {
  const defaultLevel = { element: 30, weaponType: 16, fafnir: 0 };
  let new_halidom = {};
  Object.keys(halidom).forEach(field => {
    if (halidom[field]) {
      let facility = { ...halidom[field] };
      let item = null;
      halidom[field].id.forEach(index => {
        item = { ...halidom[field][index], level: defaultLevel[field] };
        facility = { ...facility, [index]: item };
      })
      new_halidom = { ...new_halidom, [field]: facility };
    }
  })
  return { ...halidom, ...new_halidom };
}

const maxHalidom = (halidom) => {
  let new_halidom = {};
  Object.keys(halidom).forEach(field => {
    if (halidom[field]) {
      let facility = { ...halidom[field] };
      let item = null;
      halidom[field].id.forEach(index => {
        item = { ...halidom[field][index], level: 30 };
        facility = { ...facility, [index]: item };
      })
      new_halidom = { ...new_halidom, [field]: facility };
    }
  })
  return { ...halidom, ...new_halidom };
}

const halidomReducer = reducerCreator({
  [actionTypes.SELECT_HALIDOM]: selectHalidom,
  [actionTypes.RESET_HALIDOM]: resetHalidom,
  [actionTypes.UPDATE_HALIDOM]: updateHalidom,
  [actionTypes.DEFAULT_HALIDOM]: defaultHalidom,
  [actionTypes.MAX_HALIDOM]: maxHalidom,
})

export default halidomReducer;