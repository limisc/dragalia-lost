import { actionTypes, getField } from '../actions';
import filterReducer from './filterReducer';
import statsReducer from './statsReducer';

const focusReducer = (focusKey, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return action.statsKey;
  }

  return focusKey;
};

const rootReducer = ({ focusKey, filters, stats }, action) => {
  const newFocus = focusReducer(focusKey, action);
  const newStats = statsReducer(stats, action);
  return {
    focusKey: newFocus,
    stats: newStats,
    field: getField(newFocus),
    filters: filterReducer(filters, action, newStats),
  };
};

export default rootReducer;
