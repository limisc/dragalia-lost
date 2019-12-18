import buildReducer from './buildReducer';
import focusReducer from './focusReducer';
import halidomReducer from './halidomReducer';
import itemReducer from './itemReducer';
import optionReducer from './optionReducer';
import panelReducer from './panelReducer';
import themeReducer from './themeReducer';

const rootReducer = (
  { builds, focused, halidom, items, options, panel, theme },
  action
) => {
  return {
    builds: buildReducer(builds, action),
    focused: focusReducer(focused, action),
    halidom: halidomReducer(halidom, action),
    items: itemReducer(items, action),
    options: optionReducer(options, action),
    panel: panelReducer(panel, action),
    theme: themeReducer(theme, action),
  };
};

export default rootReducer;
