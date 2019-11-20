import actionTypes from '../actions/actionTypes';
import includes from '../utils/includes';
import initState from '../store/state';
import createReducer from './createReducer';

const reset = (options, { payload }) => {
  if (includes(options, payload)) {
    return {
      ...options,
      [payload]: initState.options[payload],
    };
  }

  return initState.options;
};

// only light up the picked option
const light = (options, { name, value }) => {
  return {
    ...options,
    [name]: options[name].map(item => {
      return { ...item, checked: item.value === value };
    }),
  };
};

const select = (options, { checked, name, value }) => {
  return {
    ...options,
    [name]: options[name].map(item =>
      item.value === value ? { ...item, checked } : item
    ),
  };
};

const optionReducer = createReducer({
  [actionTypes.RESET_OPTIONS]: reset,
  [actionTypes.LIGHT_OPTION]: light,
  [actionTypes.SELECT_OPTION]: select,
});

export default optionReducer;
