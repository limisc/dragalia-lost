import actionTypes from '../actions/actionTypes';
import { createReducer } from '../actions/actions';


const setSection = (state, action) => {
  // action: { section }
  return action.section;
}

const sectionReducer = createReducer({}, {
  [actionTypes.SET_SECTION]: setSection,
});

export default sectionReducer;

