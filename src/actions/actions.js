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
const selectFocus = actionCreator(actionTypes.SELECT_FOCUS, "statsKey");



export {
  reducerCreator,
  selectFilters,
  selectFocus,
};