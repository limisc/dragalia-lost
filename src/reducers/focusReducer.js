import { actionTypes } from 'actions';

const focusReducer = (focused, { type, itemKey }) => {
  if (type === actionTypes.SELECT_FOCUS) {
    return itemKey;
  }

  return focused;
};

export default focusReducer;
