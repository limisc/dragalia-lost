/* eslint-disable no-unused-vars */
import actionTypes from './actionTypes';
import { history, store, statsKeys, refs } from '../store';
// import { getSearch } from "./selectors";

const actionCreator = (type, ...argNames) => {
  return (...args) => {
    const action = { type };
    argNames.forEach((v, i) => {
      action[v] = args[i];
    });

    return action;
  };
};

export const reducerCreator = handler => {
  return (state, action, ...args) => {
    if (handler.hasOwnProperty(action.type)) {
      return handler[action.type](state, action, ...args);
    }

    return state;
  };
};

export const loadState = key => {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }

    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveState = (key, data) => {
  try {
    const state = JSON.stringify(data);
    localStorage.setItem(key, state);
  } catch (error) {
    console.log(error);
  }
};

export const removeState = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

// const pushHistory = () => {
//   const { stats } = store.getState();
//   const search = getSearch(stats);
//   history.push(search);
// }

// const replaceHistory = (search) => {
//   const { stats } = store.getState();
//   const newSearch = getSearch(stats);
//   if (newSearch !== search) {
//     history.replace(newSearch);
//   }
// }

export const selectFocus = statsKey => dispatch => {
  const { stats } = store.getState();
  if (stats[statsKey]) {
    dispatch({ type: actionTypes.SELECT_STATS, statsKey, item: null });
    // TODO history push
    // pushHistory();
  }

  dispatch({ type: actionTypes.SELECT_FOCUS, statsKey });
};

// export const syncStats = search => dispatch => {
//   dispatch({ type: actionTypes.SYNC_STATS, search });
//   replaceHistory(search);
// }

export const selectStats = (statsKey, item) => dispatch => {
  // const { stats: prevStats } = store.getState();
  dispatch({ type: actionTypes.SELECT_STATS, statsKey, item });
  // const { stats } = store.getState();
  // if (stats !== prevStats) {
  //   const search = getSearch(stats);
  //   history.push(search);
  // }

  window.scrollTo(0, refs.setStats.current.offsetTop);
};

export const reset = actionCreator(actionTypes.RESET);
export const resetFilters = actionCreator(actionTypes.RESET_FILTERS);

export const selectFilters = actionCreator(actionTypes.SELECT_FILTERS, 'key', 'value');
export const selectPanel = actionCreator(actionTypes.SELECT_PANEL, 'panel');

// export const selectStats = actionCreator(actionTypes.SELECT_STATS, 'statsKey', 'item');
export const updateStats = actionCreator(actionTypes.UPDATE_STATS, 'statsKey', 'updates');

export const loadHalidom = actionCreator(actionTypes.LOAD_HALIDOM, 'variation');
export const updateHalidom = actionCreator(actionTypes.UPDATE_HALIDOM, 'fKey', 'sKey', 'iKey', 'level');
export const updateDetails = actionCreator(actionTypes.UPDATE_DETAILS, 'statsKey', 'state');
