/* eslint-disable no-unused-vars */
import actionTypes from './actionTypes';

const actionCreator = (type, ...argNames) => {
  return (...args) => {
    const action = { type };
    argNames.forEach((v, i) => {
      action[v] = args[i];
    });

    return action;
  }
}

const reducerCreator = (handler) => {
  return (state, action, ...args) => {
    if (handler.hasOwnProperty(action.type)) {
      return handler[action.type](state, action, ...args);
    }
    return state;
  }
}

const selectFilters = actionCreator(actionTypes.SELECT_FILTERS, "key", "value");

const selectFocus = statsKey => dispatch => {
  dispatch({ type: actionTypes.SELECT_FOCUS, statsKey });

}
const selectStats = actionCreator(actionTypes.SELECT_STATS, "statsKey", "item");
const syncStats = actionCreator(actionTypes.AYNC_STATS, "search");
const updateDetails = actionCreator(actionTypes.UPDATE_DETAILS, "statsKey", "state");

export {
  reducerCreator,
  selectFilters,
  selectFocus,
  selectStats,
  syncStats,
  updateDetails,
};