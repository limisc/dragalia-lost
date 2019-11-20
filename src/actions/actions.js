import actionTypes from './actionTypes';

const createAction = type => params => {
  if (params == null) return { type };

  if (typeof params === 'object') {
    return { type, ...params };
  }

  return { type, payload: params };
};

export const resetOptions = createAction(actionTypes.RESET_OPTIONS);

export const selectOption = createAction(actionTypes.SELECT_OPTION);
