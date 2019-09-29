const reducerCreator = handler => (state, action) => {
  const { type } = action;
  if (Object.prototype.hasOwnProperty.call(handler, type)) {
    return handler[type](state, action);
  }

  return state;
};

export default reducerCreator;
