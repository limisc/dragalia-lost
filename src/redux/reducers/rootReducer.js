import actionTypes from '../actions/actionTypes';
import { createReducer } from '../actions/actions';
import sectionReducer from './sectionReducer';
import filterReducer from './filterReducer';
import statsReducer from './statsReducer';
import detailReducer from './detailReducer';

const setLanguage = (state, action) => {
  return action.language;
}

const languageReducer = createReducer({}, {
  [actionTypes.SET_LANGUAGE]: setLanguage,
})



const rootReducer = (state, action) => {
  return {
    focusSection: sectionReducer(state.focusSection, action),
    language: languageReducer(state.language, action),
    filters: filterReducer(state.filters, action, state.stats),
    stats: statsReducer(state.stats, action),
    details: detailReducer(state.details, action, state.stats),
  }

}


export default rootReducer;