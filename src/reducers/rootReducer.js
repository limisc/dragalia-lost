import focusReducer from './focusReducer';
import halidomReducer from './halidomReducer';
import itemReducer from './itemReducer';
import optionReducer from './optionReducer';
import panelReducer from './panelReducer';
import buildReducer from './buildReducer';

const rootReducer = (
  { builds, focused, halidom, items, options, panel },
  action
) => {
  return {
    focused: focusReducer(focused, action),
    halidom: halidomReducer(halidom, action),
    items: itemReducer(items, action),
    options: optionReducer(options, action),
    panel: panelReducer(panel, action),
    builds: buildReducer(builds, action),
  };
};

export default rootReducer;
