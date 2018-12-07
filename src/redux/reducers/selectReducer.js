
const selectReducer = (state = {

}, action) => {
  switch (action.type) {
    case "HANDLE_SECTION": {
      return {
        state,
      }
    }
    default: {
      return state;
    }

  }
};

export default selectReducer;