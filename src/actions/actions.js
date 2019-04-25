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

  return undefined;
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

const actionCreator = (type, ...argNames) => {
  return (...args) => {
    const action = { type };
    argNames.forEach((v, i) => {
      action[v] = args[i];
    });

    return action;
  };
};
