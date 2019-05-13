/* eslint-disable no-unused-vars */
import uuidv4 from 'uuid/v4';
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

const loadHalidom = (halidom, action, simc) => {
  const key = simc ? 'simcHalidom' : 'calcHalidom';
  const { variant } = action;
  if (variant === 'sync') {
    console.log('sync');
    return syncHalidom(key);
  } else if (variant === 'load') {
    return loadState(key) || loadState('calcHalidom') || halidom;
  }

  return halidom;
};

const toggleHalidom = (halidom, action) =>
  loadHalidom(halidom, { variant: 'load' }, action.simc);

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

const addHalidom = (halidom, action) => {
  const { field, section, item } = action;

  const itemKey = `simc_${uuidv4()}`;

  return {
    ...halidom,
    [field]: {
      ...halidom[field],
      [section]: {
        ...halidom[field][section],
        [itemKey]: item,
      },
    },
  };
};

const delHalidom = (halidom, action) => {
  const { field, section, itemKey } = action;
  let { [itemKey]: _, ...rest } = halidom[field][section];
  if (!Object.keys(rest).length) {
    rest = null;
  }

  return {
    ...halidom,
    [field]: {
      ...halidom[field],
      [section]: rest,
    },
  };
};

const halidomReducer = reducerCreator({
  [actionTypes.SET_SIMC]: toggleHalidom,
  [actionTypes.LOAD_HALIDOM]: loadHalidom,
  [actionTypes.UPDATE_HALIDOM]: updateHalidom,
  [actionTypes.ADD_HALIDOM]: addHalidom,
  [actionTypes.DEL_HALIDOM]: delHalidom,
});

export default halidomReducer;
