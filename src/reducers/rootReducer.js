import focusReducer from './focusReducer';
import optionReducer from './optionReducer';
import itemReducer from './itemReducer';

const rootReducer = ({ focused, items, options }, action) => {
  return {
    focused: focusReducer(focused, action),
    items: itemReducer(items, action),
    options: optionReducer(options, action),
  };
};

export default rootReducer;
