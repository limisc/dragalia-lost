import {
  actionTypes,
  getSearch,
} from "actions";
import {
  statsFields,
  history,
} from "store";

const searchReducer = (search, action, stats) => {
  const { type } = action;
  if (type === actionTypes.AYNC_STATS) {
    return action.search;
  } else if (type === actionTypes.SELECT_STATS) {
    const new_search = getSearch(statsFields)(stats);
    history.push(`?${new_search}`);
    return new_search;
  }

  return search;
}

export default searchReducer;