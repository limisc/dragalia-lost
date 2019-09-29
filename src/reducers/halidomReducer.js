import { actionTypes } from 'actions';
import { loadState, reducerCreator } from 'utils';
import { initHalidom } from 'data';
import merge from 'deepmerge';

const load = (_, halidom) => {
  let backup = loadState('halidom');
  if (backup === null) return halidom;

  if (Object.keys(backup).length !== Object.keys(initHalidom).length) {
    backup = merge(halidom, backup);
  }

  return backup;
};

/**
 * set level of smithy, rupie, dragontree and dragcolith
 */
const setting = ({ name, value }, halidom) => {
  return {
    ...halidom,
    [name]: value,
  };
};

const update = ({ halidomKey, level }, halidom) => {
  if (halidom[halidomKey].level === level) {
    return halidom;
  }

  return {
    ...halidom,
    [halidomKey]: {
      ...halidom[halidomKey],
      level,
    },
  };
};

const halidomReducer = reducerCreator({
  [actionTypes.LOAD_HALIDOM]: load,
  [actionTypes.UPDATE_HALIDOM]: update,
  [actionTypes.UPDATE_SETTING]: setting,
});

export default halidomReducer;
