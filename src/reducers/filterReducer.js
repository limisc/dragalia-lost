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

// only light up the picked option
const light = (filters, { name, value }) => {
  return {
    ...filters,
    [name]: filters[name].map(item => {
      return { ...item, checked: item.label === value };
    }),
  };
};
/**
 * (state, action: { checked, name, value }
 */
const filterReducer = reducerCreator({
  [actionTypes.RESET_FILTERS]: reset,
  [actionTypes.RESET_STATS]: reset,
  [actionTypes.SELECT_FILTER]: select,
  [actionTypes.LIGHT_OPTION]: light,
});

export default filterReducer;
