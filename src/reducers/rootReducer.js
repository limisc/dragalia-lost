import focusReducer from './focusReducer';
import halidomReducer from './halidomReducer';
import itemReducer from './itemReducer';
import optionReducer from './optionReducer';

const rootReducer = ({ focused, halidom, items, options }, action) => {
  return {
    focused: focusReducer(focused, action),
    halidom: halidomReducer(halidom, action),
    items: itemReducer(items, action),
    options: optionReducer(options, action),
  };
};

export default rootReducer;
