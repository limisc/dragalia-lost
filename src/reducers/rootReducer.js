import { actionTypes, getField } from '../actions';
import filterReducer from './filterReducer';
import statsReducer from './statsReducer';

const focusReducer = (focusKey, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return action.statsKey;
  }

  return focusKey;
};

const panelReducer = (panel, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return '0';
  } else if (action.type === actionTypes.SELECT_PANEL) {
    return action.panel;
  }

  return panel;
};

const rootReducer = ({ focusKey, panel, filters, stats }, action) => {
  const newFocus = focusReducer(focusKey, action);
  const newStats = statsReducer(stats, action);
  return {
    focusKey: newFocus,
    stats: newStats,
    field: getField(newFocus),
    panel: panelReducer(panel, action),
    filters: filterReducer(filters, action, newStats),
  };
};

export default rootReducer;
