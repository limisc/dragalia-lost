import actionTypes from '../actions/actionType';
const statusReducer = (state = {
  statusState: {}
}, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_SECTION: {
      console.log("REDUCER HANDLE SECTION")
      return state;
    }

    default: {
      return state;
    }

  }
};

export default statusReducer;