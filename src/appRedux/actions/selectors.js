/* eslint-disable no-unused-vars */
import { createSelector } from 'reselect';
import { statsKeys } from '../store';
import { dataDict, limit, values } from 'data';
import locales from 'locales/default';

export const translate = (content, lang = 'en') => {
  if (locales[content]) {
    return locales[content][lang] || locales[content].en;
  }

  return content;
};

export const getItem = (statsKey, id) => {
  const dir = getDir(statsKey);
  if (dataDict[dir]) {
    return dataDict[dir][id];
  }

  return null;
};

export const getLimit = (key, rarity, unbind = 4) => {
  switch (key) {
    case 'bond':
    case 'altar':
    case 'dojo':
    case 'fafnir':
    case 'slime':
    case 'event':
      return limit[key];
    case 'adventurer':
    case 'mana':
      return limit[key][rarity] || 0;
    default:
      const dir = getDir(key);
      if (limit[dir][rarity]) {
        return limit[dir][rarity][unbind] || 0;
      }

      return 0;
  }
};

export const getDir = statsKey => {
  if (statsKey === 'wyrmprint1' || statsKey === 'wyrmprint2') {
    return 'wyrmprint';
  }

  return statsKey;
};

export const getSearch = stats => {
  const searchArray = [];
  statsKeys.forEach(k => {
    if (stats[k]) {
      searchArray.push(`${k}=${stats[k].id}`);
    }
  });

  return `?${searchArray.join('&')}`;
};

export const parseSearch = createSelector(
  search => search.slice(1).split('&'),
  searchArray => {
    const q = {};
    searchArray.forEach(v => {
      const a = v.split('=');
      q[a[0]] = getItem(a[0], a[1]);
    });
    return q;
  }
);

export const getSelectKey = stats => {
  const { adventurer, dragon } = stats;
  const { element, weapon } = adventurer || {};
  const { element: dragonEle } = dragon || {};
  return { element, weapon, dragon: dragonEle };
};

const getFacilityValue = item => {
  if (item) {
    const { type, level } = item;
    return values[type][level] || { HP: 0, STR: 0 };
  }

  return { HP: 0, STR: 0 };
};

// TODO memoize reselect
export const calcSection = section => {
  if (!section) {
    return { HP: 0, STR: 0 };
  }

  let HP, STR;
  HP = STR = 0;
  Object.keys(section).forEach(iKey => {
    const value = getFacilityValue(section[iKey]);
    HP += value.HP;
    STR += value.STR;
  });

  return { HP, STR };
};
