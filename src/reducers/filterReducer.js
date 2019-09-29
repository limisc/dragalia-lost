import { actionTypes } from 'actions';
import reducerCreator from 'utils/reducerCreator';
import initState from '../store/state';

const reset = () => initState.filters;

const select = (filters, { checked, name, value }) => {
  return {
    ...filters,
    [name]: filters[name].map(item =>
      item.label === value ? { ...item, checked } : item
    ),
  };
};

/**
 * (state, action: { checked, name, value }
 */
const filterReducer = reducerCreator({
  [actionTypes.RESET_FILTERS]: reset,
  [actionTypes.RESET_STATS]: reset,
  [actionTypes.SELECT_FILTER]: select,
});

export default filterReducer;
