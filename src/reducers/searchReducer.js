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
  if (type === actionTypes.AYNC_STATS
    || type === actionTypes.SELECT_STATS) {
    const newSearch = getSearch(statsFields)(stats);
    history.push(`?${newSearch}`);
    return newSearch;
  }

  return search;
}

export default searchReducer;