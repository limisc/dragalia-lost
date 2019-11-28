import {
  ABILITY_TYPES,
  ELEMENT_TYPES,
  RARITY_TYPES,
  WEAPON_TYPES,
  initHalidom,
} from 'data';

const createOption = types => {
  return types.map(value => ({ value, checked: false }));
};

const state = {
  builds: null,
  focused: 'adventurer',
  halidom: initHalidom,
  items: {
    adventurer: null,
    dragon: null,
    weapon: null,
    wyrmprint1: null,
    wyrmprint2: null,
  },
  options: {
    element: createOption(ELEMENT_TYPES),
    rarity: createOption(RARITY_TYPES),
    type: createOption(ABILITY_TYPES),
    weapon: createOption(WEAPON_TYPES),
  },
  panel: false,
};

export default state;
