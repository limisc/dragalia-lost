import state from "store/state";
import filterReducer from "./filterReducer";
import searchReducer from "./searchReducer";
import statsReducer from "./statsReducer";
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
  search,
  stats,
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
    filters: filterReducer(filters, action),
    section: getSection(newFocus),
    search: searchReducer(search, action, newStats),
    details: detailReducer(details, action, newStats),
  }
}

export default rootReducer;