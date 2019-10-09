import { initHalidom } from 'data';
import { makeCheckedArr } from 'utils/filters';

const state = {
  halidom: initHalidom,
  filters: {
    rarity: makeCheckedArr('rarity'),
    element: makeCheckedArr('element'),
    weapon: makeCheckedArr('weapon'),
  },
  focused: 'adventurer',
  stats: {
    adventurer: null,
    dragon: null,
    weapon: null,
    wyrmprint1: null,
    wyrmprint2: null,
  },
};

export default state;
