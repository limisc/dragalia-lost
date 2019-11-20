import optionReducer from './optionReducer';

const rootReducer = ({ focused, options }, action) => {
  return {
    focused,
    options: optionReducer(options, action),
  };
};

export default rootReducer;
