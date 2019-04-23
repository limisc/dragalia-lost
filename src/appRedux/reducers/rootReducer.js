import { state } from '../store';
import { actionTypes, getDir, loadState } from '../actions';
import { facilities } from 'data';
import filterReducer from './filterReducer';
import statsReducer from './statsReducer';
import halidomReducer from './halidomReducer';

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

const rootReducer = ({ focusKey, panel, filters, stats, halidom }, action) => {
  if (action.type === actionTypes.RESET) {
    const halidom = loadState('calcHalidom') || facilities;
    return { ...state, halidom };
  }

  const newFocusKey = focusReducer(focusKey, action);
  const newStats = statsReducer(stats, action);
  return {
    stats: newStats,
    focusKey: newFocusKey,
    dir: getDir(newFocusKey),
    panel: panelReducer(panel, action),
    halidom: halidomReducer(halidom, action),
    filters: filterReducer(filters, action, newStats),
  };
};

export default rootReducer;
