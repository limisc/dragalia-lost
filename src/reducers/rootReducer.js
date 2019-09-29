import { actionTypes } from '../actions';
import filterReducer from './filterReducer';
import statsReducer from './statsReducer';
import halidomReducer from './halidomReducer';

/**
 * @param {Object} action
 * @param {string} action.type
 * @param {string} action.payload focused statsKey
 * @param {string} focused
 * @returns {string}
 */
const focusReducer = ({ type, payload }, focused) => {
  switch (type) {
    case actionTypes.RESET_STATS:
      return 'adventurer';
    case actionTypes.SELECT_FOCUS:
      return payload;
    default:
      return focused;
  }
};

const rootReducer = ({ focused, filters, stats, halidom }, action) => {
  const newStats = statsReducer(action, stats);
  return {
    filters: filterReducer(filters, action),
    focused: focusReducer(action, focused),
    halidom: halidomReducer(action, halidom),
    stats: newStats,
  };
};

export default rootReducer;
