import {
  actionTypes,
  reducerCreator,
} from "actions";
import {
  history,
  statsFields,
} from "store";

const getSearch = (stats) => {
  const searchArray = [];
  statsFields.forEach((k) => {
    if (stats[k]) {
      searchArray.push(`${k}=${stats[k].Id}`);
    }
  });

  return `?${searchArray.join("&")}`;
}

const syncStats = (_, action, stats) => {
  const { search } = action;
  const newSearch = getSearch(stats);
  if (newSearch !== search) {
    console.log("replace")
    return newSearch;
  }

  // history.replace(newSearch);
  return search;
}

const selectStats = (search, action, stats, prevStats) => {
  if (stats === prevStats) {
    return search;
  }

  const newSearch = getSearch(stats);
  history.push(newSearch);
  return newSearch;
}


const searchReducer = reducerCreator({
  [actionTypes.SYNC_STATS]: syncStats,
  [actionTypes.SELECT_STATS]: selectStats,
})
export default searchReducer;