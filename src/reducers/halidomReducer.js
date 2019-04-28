/* eslint-disable no-unused-vars */
import { actionTypes, reducerCreator, loadState, saveState } from '../actions';
import { facilities } from 'data';

const syncHalidom = key => {
  const facility = loadState(key);
  let halidom = facilities;
  if (facility) {
    halidom = { ...facilities };
    Object.keys(halidom).forEach(field => {
      // field: element, weapon, dragon
      Object.keys(halidom[field]).forEach(section => {
        // section: Flame, Water, Wind...
        if (halidom[field][section]) {
          // facilities.dragon.(Flame|Light|Shadow) === null
          Object.keys(halidom[field][section]).forEach(itemKey => {
            if (
              facility[field] &&
              facility[field][section] &&
              facility[field][section][itemKey]
            ) {
              halidom[field][section][itemKey] = {
                ...halidom[field][section][itemKey],
                ...facility[field][section][itemKey],
              };
            }
          });
        }
      });
    });
  }
  saveState(key, halidom);
  return halidom;
};

const loadHalidom = (halidom, action) => {
  const key = 'calcHalidom';
  const { variant } = action;
  if (variant === 'sync') {
    console.log('sync')
    return syncHalidom(key);
  } else if (variant === 'load') {
    return loadState(key) || halidom;
  }

  return halidom;
};

const updateHalidom = (halidom, action) => {
  const { field, section, itemKey, level } = action;

  if (halidom[field][section][itemKey].level !== level) {
    return {
      ...halidom,
      [field]: {
        ...halidom[field],
        [section]: {
          ...halidom[field][section],
          [itemKey]: {
            ...halidom[field][section][itemKey],
            level,
          },
        },
      },
    };
  }

  return halidom;
};

const halidomReducer = reducerCreator({
  [actionTypes.LOAD_HALIDOM]: loadHalidom,
  [actionTypes.UPDATE_HALIDOM]: updateHalidom,
});

export default halidomReducer;
