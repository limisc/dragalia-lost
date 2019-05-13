import { facilities } from 'data';
import { loadState } from '../actions';

const simc = loadState('simc') || false;
const key = simc ? 'simcHalidom' : 'calcHalidom';
const halidom = loadState(key) || loadState('calcHalidom') || facilities;

const state = {
  panel: '0',
  field: 'adventurer',
  focusKey: 'adventurer',
  filters: { weapon: '', element: '', rarity: '' },
  stats: {
    adventurer: null,
    weapon: null,
    wyrmprint1: null,
    wyrmprint2: null,
    dragon: null,
  },
  simc,
  halidom,
};

export default state;
