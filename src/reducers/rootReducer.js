import { state } from "store";
import actionTypes from '../actions/actionTypes';
import filterReducer from './filterReducer';
import statsReducer from './statsReducer';
// import detailReducer from './detailReducer';

import {
  getSection,
} from "actions";

const statsKeyReducer = (focusStats, action) => {
  if (action.type === actionTypes.SELECT_STATSKEY) {
    return action.statsKey;
  }

  return focusStats;
}

const rootReducer = ({
  focusStats,
  filters,
  stats,
  details,
}, action) => {

  if (action.type === actionTypes.RESET) {
    return state;
  }

  const section = getSection(focusStats);
  return {
    focusStats: statsKeyReducer(focusStats, action),
    focusSection: section,
    filters: filterReducer(filters, action, stats),
    // filters: filterReducer(filters, action, stats),
    stats: statsReducer(stats, action),
    // details: detailReducer(details, action),
  }
}

export default rootReducer;