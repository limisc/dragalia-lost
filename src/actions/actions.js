/* eslint-disable no-unused-vars */
import actionTypes from './actionTypes';
import { history, store, } from "store";
import {
  getSearch,
} from "./selectors";

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

const pushHistory = () => {
  const { stats } = store.getState();
  const search = getSearch(stats);
  history.push(search);
}

const replaceHistory = (search) => {
  const { stats } = store.getState();
  const newSearch = getSearch(stats);
  if (newSearch !== search) {
    history.replace(search);
  }
}

const selectFilters = actionCreator(actionTypes.SELECT_FILTERS, "key", "value");

const selectFocus = statsKey => dispatch => {
  dispatch({ type: actionTypes.SELECT_FOCUS, statsKey });
  const { stats } = store.getState();
  if (stats[statsKey]) {
    dispatch({ type: actionTypes.SELECT_STATS, statsKey, item: null });
    pushHistory();
  }
}

const syncStats = search => dispatch => {
  dispatch({ type: actionTypes.SYNC_STATS, search });
  replaceHistory(search);
}

const selectStats = (statsKey, item) => dispatch => {
  dispatch({ type: actionTypes.SELECT_STATS, statsKey, item });
  pushHistory();
}

const resetFacility = actionCreator(actionTypes.RESET_FACILITY, "facilityType");
const newFacility = actionCreator(actionTypes.NEW_FACILITY, "facilityType", "key", "facilityValue");
const updateFacility = actionCreator(actionTypes.UPDATE_FACILITY, "facilityType", "key", "facilityValue");

const updateDetails = actionCreator(actionTypes.UPDATE_DETAILS, "statsKey", "state");




export {
  reducerCreator,
  selectFilters,
  selectFocus,
  selectStats,
  syncStats,
  resetFacility,
  newFacility,
  updateFacility,
  updateDetails,
};