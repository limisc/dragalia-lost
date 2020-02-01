import {
  ABILITY_TYPES,
  ELEMENT_TYPES,
  RARITY_TYPES,
  WEAPON_TYPES,
  initHalidom,
} from 'data';
import { setColor } from 'utils';

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
    Element: createOption(ELEMENT_TYPES),
    Rarity: createOption(RARITY_TYPES),
    Type: createOption(ABILITY_TYPES),
    Weapon: createOption(WEAPON_TYPES),
  },
  panel: false,
  theme: setColor('#eed6ad'),
};

export default state;
