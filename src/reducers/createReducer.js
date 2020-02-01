import { includes } from '../utils';

const createReducer = handler => (state, action) => {
  const { type } = action;
  if (includes(handler, type)) {
    return handler[type](state, action);
  }

  return state;
};

export default createReducer;
