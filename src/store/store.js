import {
  createStore,
  applyMiddleware,
} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import state from './state';


const store = createStore(
  rootReducer,
  state,
  applyMiddleware(thunk),
);

export default store;