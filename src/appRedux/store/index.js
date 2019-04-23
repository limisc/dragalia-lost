import { createRef } from 'react';
import history from './history';
import state from './state';
import store from './store';

const statsKeys = [
  'adventurer',
  'weapon',
  'wyrmprint1',
  'wyrmprint2',
  'dragon',
];

const refs = {
  setStats: createRef(),
  statsList: createRef(),
};

export { history, state, store, statsKeys, refs };
export default store;
