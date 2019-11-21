import { ABILITY_TYPES, ELEMENT_TYPES, RARITY_TYPES, WEAPON_TYPES } from 'data';

const createOption = types => {
  return types.map(value => ({ value, checked: false }));
};

const state = {
  focused: 'adventurer',
  options: {
    element: createOption(ELEMENT_TYPES),
    rarity: createOption(RARITY_TYPES),
    weapon: createOption(WEAPON_TYPES),
    type: createOption(ABILITY_TYPES),
  },
  items: {
    adventurer: null,
    weapon: null,
    dragon: null,
    wyrmprint1: null,
    wyrmprint2: null,
  },
};

export default state;
