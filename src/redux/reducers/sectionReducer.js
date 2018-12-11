import actionType from '../actions/actionType';
import { createReducer } from '../actions/actions';


const setSection = (state, action) => {
  // action: { section }
  return action.section;
}

const sectionReducer = createReducer({}, {
  [actionType.SET_SECTION]: setSection,
});

export default sectionReducer;

