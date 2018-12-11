import actionTypes from '../actions/actionTypes';
import { updateObject, createReducer } from '../actions/actions';


const selectStats = (state, action) => {
  // action = { section, item }
  const { weaponType } = action.item;
  let new_state = updateObject(state, { [action.section]: action.item });
  console.log(new_state)
  //if adventurer & weapon weaponType are different, then remove the one previous selected, but keep recent one.
  const checkArray = ["adventurer", "weapon"];
  const index = checkArray.indexOf(action.section);
  if (index !== -1) {
    const checkSection = checkArray[1 - index];
    const { [checkSection]: checkItem } = state;
    if (checkItem && checkItem.weaponType !== weaponType) {
      new_state = updateObject(new_state, { [checkSection]: null });
    }
  }
  return new_state;
}


const statsReducer = createReducer({}, {
  [actionTypes.SELECT_STATS]: selectStats,

})

export default statsReducer;