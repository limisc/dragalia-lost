import state from "store/state";
import filterReducer from "./filterReducer";
import searchReducer from "./searchReducer";
import statsReducer from "./statsReducer";
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

  const new_stats = statsReducer(stats, action);
  const new_search = searchReducer(search, action, new_stats);
  return {
    filters: filterReducer(filters, action),
    focusKey: focusReducer(focusKey, action),
    section: getSection(focusKey),
    search: new_search,
    stats: new_stats,
    // details: detailReducer(details, action),
  }
}

export default rootReducer;