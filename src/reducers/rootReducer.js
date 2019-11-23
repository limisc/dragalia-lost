import focusReducer from './focusReducer';
import halidomReducer from './halidomReducer';
import itemReducer from './itemReducer';
import optionReducer from './optionReducer';
import panelReducer from './panelReducer';

const rootReducer = ({ focused, halidom, items, options, panel }, action) => {
  return {
    focused: focusReducer(focused, action),
    halidom: halidomReducer(halidom, action),
    items: itemReducer(items, action),
    options: optionReducer(options, action),
    panel: panelReducer(panel, action),
  };
};

export default rootReducer;
