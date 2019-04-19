/* eslint-disable no-unused-vars */
import { actionTypes, reducerCreator, loadState, saveState } from '../actions';
import { facilities } from 'data';

const syncHalidom = key => {
  const facility = loadState(key);
  let halidom = facilities;
  if (facility) {
    halidom = { ...facilities };
    Object.keys(halidom).forEach(fKey => {
      // fKey: element, weapon, dragon
      Object.keys(halidom[fKey]).forEach(sKey => {
        // sKey: Flame, Water, Wind...
        if (halidom[fKey][sKey]) {
          // facilities.dragon.(Flame|Light|Shadow) === null
          Object.keys(halidom[fKey][sKey]).forEach(iKey => {
            if (
              facility[fKey] &&
              facility[fKey][sKey] &&
              facility[fKey][sKey][iKey]
            ) {
              halidom[fKey][sKey][iKey] = {
                ...halidom[fKey][sKey][iKey],
                ...facility[fKey][sKey][iKey],
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
  // TODO change key in future, depends on mode
  const key = 'calcHalidom';
  const { variation } = action;
  if (variation === 'sync') {
    return syncHalidom(key);
  } else if (variation === 'load') {
    return loadState(key) || halidom;
  }

  return halidom;
};

const updateHalidom = (halidom, action) => {
  const { fKey, sKey, iKey, level } = action;

  if (halidom[fKey][sKey][iKey].level !== level) {
    return {
      ...halidom,
      [fKey]: {
        ...halidom[fKey],
        [sKey]: {
          ...halidom[fKey][sKey],
          [iKey]: {
            ...halidom[fKey][sKey][iKey],
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
