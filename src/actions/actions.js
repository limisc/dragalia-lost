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

export const reducerCreator = (handler) => {
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
    history.replace(newSearch);
  }
}



export const selectFocus = statsKey => dispatch => {
  const { stats } = store.getState();
  if (stats[statsKey]) {
    dispatch({ type: actionTypes.SELECT_STATS, statsKey, item: null });
    pushHistory();
  }
  dispatch({ type: actionTypes.SELECT_FOCUS, statsKey });
}

export const syncStats = search => dispatch => {
  dispatch({ type: actionTypes.SYNC_STATS, search });
  replaceHistory(search);
}

export const selectStats = (statsKey, item) => dispatch => {
  const { stats: prevStats } = store.getState();
  dispatch({ type: actionTypes.SELECT_STATS, statsKey, item });
  const { stats } = store.getState();
  if (stats !== prevStats) {
    const search = getSearch(stats);
    history.push(search);
  }
}
export const selectCol = actionCreator(actionTypes.SELECT_COL, "col");
export const selectFilters = actionCreator(actionTypes.SELECT_FILTERS, "key", "value");
export const updateStats = actionCreator(actionTypes.UPDATE_STATS, "statsKey", "updates");
export const updateHalidom = actionCreator(actionTypes.UPDATE_HALIDOM, "field", "index", "level");
export const updateDetails = actionCreator(actionTypes.UPDATE_DETAILS, "statsKey", "state");