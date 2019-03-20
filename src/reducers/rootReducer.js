import state from "store/state";
import filterReducer from "./filterReducer";
import statsReducer from "./statsReducer";
import halidomReducer from "./halidomReducer";
import detailReducer from "./detailReduer";
import {
  actionTypes,
  getSection,
} from "actions";

const colReducer = (col, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return 0;
  } else if (action.type === actionTypes.SELECT_COL) {
    return action.col;
  }

  return col;
}


const focusReducer = (focusKey, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return action.statsKey;
  }

  return focusKey;
}

const rootReducer = ({
  col,
  // lang,
  filters,
  focusKey,
  stats,
  halidom,
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
    col: colReducer(col, action),
    focusKey: newFocus,
    stats: newStats,
    section: getSection(newFocus),
    filters: filterReducer(filters, action, newStats),
    halidom: halidomReducer(halidom, action, newStats),
    details: detailReducer(details, action, newStats, stats),
  }
}

export default rootReducer;