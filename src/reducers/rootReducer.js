import optionReducer from './optionReducer';
import itemReducer from './itemReducer';

const rootReducer = ({ focused, items, options }, action) => {
  return {
    focused,
    items: itemReducer(items, action),
    options: optionReducer(options, action),
  };
};

export default rootReducer;
