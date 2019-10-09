import actionTypes from './actionTypes';

export { actionTypes };

const actionCreator = type => params => {
  if (params == null) {
    return { type };
  }

  if (typeof params === 'object') {
    return { type, ...params };
  }

  return { type, payload: params };
};

export const resetStats = () => actionCreator(actionTypes.RESET_STATS)();

export const resetFilters = actionCreator(actionTypes.RESET_FILTERS);

export const loadHalidom = actionCreator(actionTypes.LOAD_HALIDOM);

/**
 * params: { statsKey: string, [item]: Object }
 */
export const selectItem = actionCreator(actionTypes.SELECT_ITEM);

/**
 * params: { name: string, value: string }
 */
export const selectFilter = actionCreator(actionTypes.SELECT_FILTER);

/**
 * params: flag
 */
export const selectFlag = actionCreator(actionTypes.SELECT_FLAG);

/**
 * params: focused
 */
// export const selectFocus = actionCreator(actionTypes.SELECT_FOCUS);
export const selectFocus = statsKey => (dispatch, getState) => {
  dispatch(actionCreator(actionTypes.SELECT_FOCUS)(statsKey));
  const { adventurer } = getState().stats;

  if (adventurer) {
    const fits = name => {
      return actionCreator(actionTypes.LIGHT_OPTION)({
        name,
        value: adventurer[name],
      });
    };

    switch (statsKey) {
      case 'weapon': {
        dispatch(fits('element'));
        dispatch(fits('weapon'));
        break;
      }
      case 'dragon':
        dispatch(fits('element'));
        break;
      default:
        break;
    }
  }
};

/**
 * params: { halidomKey: string, level: number }
 */
export const updateHalidom = actionCreator(actionTypes.UPDATE_HALIDOM);

/**
 * params: { name, value }
 */
export const updateSetting = actionCreator(actionTypes.UPDATE_SETTING);

/**
 * params: { statsKey: string, update: Object }
 */
export const updateItem = actionCreator(actionTypes.UPDATE_ITEM);
