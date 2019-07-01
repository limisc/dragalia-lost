import { loadState } from '../actions';
import { syncHalidom } from '../reducers/halidomReducer';

const simc = loadState('simc') || false;
const key = simc ? 'simcHalidom' : 'calcHalidom';
const halidom = syncHalidom(key);

const state = {
  simc,
  halidom,
  panel: '0',
  field: 'adventurer',
  focusKey: 'adventurer',
  filters: { weapon: '', element: '', rarity: '', type: '' },
  stats: {
    adventurer: null,
    weapon: null,
    wyrmprint1: null,
    wyrmprint2: null,
    dragon: null,
  },
};

export default state;
