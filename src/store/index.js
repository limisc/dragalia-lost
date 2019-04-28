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
  statsField: createRef(),
  statsList: createRef(),
  searchBar: createRef(),
};

const selectOptions = {
  mana: {
    '3': ['30', '20', '10', '0'],
    '4': ['40', '30', '20', '10', '0'],
    '5': ['50', '45', '40', '30', '20', '10', '0'],
  },
  curRarity: {
    '3': ['5', '4', '3'],
    '4': ['5', '4'],
    '5': ['5'],
  },
  unbind: ['4', '3', '2', '1', '0'],
};

export { history, statsKeys, refs, state, store, selectOptions };
