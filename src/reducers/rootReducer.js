import actionTypes from '../actions/actionTypes';
import filterReducer from './filterReducer';
import statsReducer from './statsReducer';
import halidomReducer from './halidomReducer';
import detailReducer from './detailReducer';


const languageReducer = (language, action) => {
  if (action.type === actionTypes.SELECT_LANGUAGE) {
    return action.language;
  }
  return language;
}

const sectionReducer = (section, action) => {
  if (action.type === actionTypes.SELECT_SECTION) {
    return action.section;
  }
  return section;
}

const rootReducer = (state, action) => {
  return {
    language: languageReducer(state.language, action),
    focusSection: sectionReducer(state.focusSection, action),
    filters: filterReducer(state.filters, action, state.stats),
    stats: statsReducer(state.stats, action),
    halidom: halidomReducer(state.halidom, action, state.stats),
    details: detailReducer(state.details, state.stats, state.halidom, action),
  }
}

export default rootReducer;