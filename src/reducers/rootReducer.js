import filterReducer from './filterReducer';

const rootReducer = ({ field, filters, stats }, action) => {
  return {
    field,
    filters: filterReducer(filters, action, stats),
  };
};

export default rootReducer;
