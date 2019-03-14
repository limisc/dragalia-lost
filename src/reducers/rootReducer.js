/* eslint-disable no-unused-vars */
import state from "store/state";
import filterReducer from "./filterReducer";
// import searchReducer from "./searchReducer";
import statsReducer from "./statsReducer";
// import halidomReducer from "./halidomReducer";
import detailReducer from "./detailReduer";
import {
  actionTypes,
  getSearch,
  getSection,
} from "actions";

import { history } from "store";


const focusReducer = (focusKey, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return action.statsKey;
  }

  return focusKey;
}

const rootReducer = ({
  filters,
  focusKey,
  // search,
  stats,
  // halidom,
  details,
}, action) => {

  if (action.type === actionTypes.RESET) {
    return {
      ...state,
    };
  }
  const newFocus = focusReducer(focusKey, action);
  const newStats = statsReducer(stats, action);

  return {
    focusKey: newFocus,
    stats: newStats,
    section: getSection(newFocus),
    filters: filterReducer(filters, action),
    // halidom: halidomReducer(halidom, action, newStats),
    // search: searchReducer(search, action, newStats, stats),
    details: detailReducer(details, action, newStats),
  }
}

export default rootReducer;