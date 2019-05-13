import { state } from '../store';
import { facilities } from 'data';
import { actionTypes, getField, loadState } from '../actions';
import filterReducer from './filterReducer';
import statsReducer from './statsReducer';
import halidomReducer from './halidomReducer';

const focusReducer = (focusKey, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return action.statsKey;
  }

  return focusKey;
};

const simcReducer = (simc, action) => {
  if (action.type === actionTypes.SET_SIMC) {
    return action.simc;
  }

  return simc;
};

const panelReducer = (panel, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return '0';
  } else if (action.type === actionTypes.SELECT_PANEL) {
    return action.panel;
  }

  return panel;
};

const rootReducer = (
  { focusKey, panel, filters, simc, stats, halidom },
  action
) => {
  if (action.type === actionTypes.RESET) {
    const halidom = loadState('calcHalidom') || facilities;
    return { ...state, halidom };
  }

  const newFocus = focusReducer(focusKey, action);
  const newStats = statsReducer(stats, action);
  return {
    focusKey: newFocus,
    stats: newStats,
    field: getField(newFocus),
    simc: simcReducer(simc, action),
    panel: panelReducer(panel, action),
    halidom: halidomReducer(halidom, action, simc),
    filters: filterReducer(filters, action, newStats),
  };
};

export default rootReducer;
