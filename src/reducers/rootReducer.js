import state from "store/state";
import filterReducer from "./filterReducer";
import {
  actionTypes,
  getSection,
} from "actions";


const focusReducer = (focusStats, action) => {
  if (action.type === actionTypes.SELECT_FOCUS) {
    return action.statsKey;
  }

  return focusStats;
}

const rootReducer = ({
  focusStats,
  filters,
  details,
}, action) => {

  if (action.type === actionTypes.RESET) {
    return state;
  }

  const section = getSection(focusStats);
  return {
    focusStats: focusReducer(focusStats, action),
    section,
    filters: filterReducer(filters, action),
    // details: detailReducer(details, action),
  }
}

export default rootReducer;











