import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import data from './data/data';


const store = createStore(
  rootReducer,
  data,
  applyMiddleware(thunk),
);

export default store;