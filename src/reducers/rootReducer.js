import state from "store/state";
import filterReducer from "./filterReducer";
import statsReducer from "./statsReducer";
import halidomReducer from "./halidomReducer";
import detailReducer from "./detailReduer";
import {
  actionTypes,
  getSection,
} from "actions";

const focusReducer = (focusKey, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return action.statsKey;
  }

  return focusKey;
}

const rootReducer = ({
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
    focusKey: newFocus,
    stats: newStats,
    section: getSection(newFocus),
    filters: filterReducer(filters, action, newStats),
    halidom: halidomReducer(halidom, action, newStats),
    details: detailReducer(details, action, newStats),
  }
}

export default rootReducer;