import actionTypes from './actionTypes';

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
  } catch (error) {
    console.log(error);
  }

  return null;
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

export const scrollToComponent = component => {
  const { current } = component;
  if (current) {
    setTimeout(() => {
      window.scrollTo({
        top: current.offsetTop - 48,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  }
};

const actionCreator = (type, ...argNames) => {
  return (...args) => {
    const action = { type };
    argNames.forEach((v, i) => {
      action[v] = args[i];
    });

    return action;
  };
};

export const setSimc = simc => dispatch => {
  dispatch({ type: actionTypes.SET_SIMC, simc });
  saveState('simc', simc);
};

export const resetAll = actionCreator(actionTypes.RESET);
export const selectFocus = actionCreator(actionTypes.SELECT_FOCUS, 'statsKey');
export const resetFilters = actionCreator(actionTypes.RESET_FILTERS);
export const selectFilters = actionCreator(actionTypes.SELECT_FILTERS, 'key', 'value');
export const selectPanel = actionCreator(actionTypes.SELECT_PANEL, 'panel');
export const selectStats = actionCreator(actionTypes.SELECT_STATS, 'statsKey', 'item');
export const updateStats = actionCreator(actionTypes.UPDATE_STATS, 'statsKey', 'updates');

export const loadHalidom = actionCreator(actionTypes.LOAD_HALIDOM, 'variant');
export const addHalidom = actionCreator(actionTypes.ADD_HALIDOM, 'field', 'section', 'item');
export const delHalidom = actionCreator(actionTypes.DEL_HALIDOM, 'field', 'section', 'itemKey');
export const updateHalidom = actionCreator(actionTypes.UPDATE_HALIDOM, 'field', 'section', 'itemKey', 'level');
