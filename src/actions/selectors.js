import locales from 'locales/default';
import { dataDict, limit } from 'data';

export const translate = (content, lang = 'en') => {
  if (locales[content]) {
    return locales[content][lang] || locales[content].en;
  }

  return content;
};

export const getField = key => {
  if (key === 'wyrmprint1' || key === 'wyrmprint2') {
    return 'wyrmprint';
  }

  return key;
};

export const getItem = (statsKey, id) => {
  const field = getField(statsKey);
  if (dataDict[field]) {
    return dataDict[field][id];
  }

  return null;
};

export const getLimit = (key, rarity, unbind = 4) => {
  switch (key) {
    case 'slime':
    case 'dracolith':
      return limit[key];
    case 'adventurer':
    case 'mana':
      return limit[key][rarity] || 0;
    case 'weapon':
    case 'wyrmprint1':
    case 'wyrmprint2':
    case 'dragon':
      const field = getField(key);
      return limit[field][rarity] ? limit[field][rarity][unbind] : 0;
    default:
      return 30;
  }
};

export const getHalidomSectionKey = stats => {
  const { element, weapon } = stats.adventurer || {};
  const { element: dragonEle } = stats.dragon || {};
  return {
    element,
    weapon,
    dragon: dragonEle,
  };
};
