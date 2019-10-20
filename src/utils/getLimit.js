import { LIMIT } from 'data';

const getLimit = (key, rarity, unbind = 4) => {
  switch (key) {
    case 'adventurer':
    case 'mana':
      return LIMIT[key][rarity];
    case 'dragon':
    case 'weapon':
      return LIMIT[key][rarity][unbind];
    case 'wyrmprint1':
    case 'wyrmprint2':
      return LIMIT.wyrmprint[rarity][unbind];
    default:
      return LIMIT[key] || 30;
  }
};

export default getLimit;
