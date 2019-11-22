import { actionTypes } from 'actions';
import { includes } from 'utils';
import createReducer from './createReducer';

const update = (halidom, { halidomKey, level }) => {
  if (includes(halidom, halidomKey) && halidom[halidomKey].level !== level) {
    return {
      ...halidom,
      [halidomKey]: {
        ...halidom[halidomKey],
        level,
      },
    };
  }

  return halidom;
};

const halidomReducer = createReducer({
  [actionTypes.UPDATE_HALIDOM]: update,
});

export default halidomReducer;
