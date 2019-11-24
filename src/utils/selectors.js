import { createSelector } from 'reselect';
import content, { ELEMENT_TYPES, WEAPON_TYPES } from 'data';
import getField from './getField';
import includes from './includes';

export const getFilterFields = createSelector(
  state => state.focused,
  focused => {
    switch (focused) {
      case 'adventurer':
      case 'weapon':
        return ['rarity', 'element', 'weapon'];
      case 'dragon':
        return ['rarity', 'element', 'type'];
      default:
        return ['rarity', 'type'];
    }
  }
);

const createFilterArray = option => {
  return option.reduce(
    (acc, { value, checked }) => (checked ? [...acc, value] : acc),
    []
  );
};

export const getFilters = createSelector(
  state => state.options,
  getFilterFields,
  (options, fields) => {
    const filters = {};

    fields.forEach(field => {
      if (includes(options, field)) {
        filters[field] = createFilterArray(options[field]);
      }
    });

    return filters;
  }
);

const selectProp = key => (_, props) => props[key];
const sumArray = array => {
  if (Array.isArray(array)) {
    return array.reduce((acc, cur) => acc + cur, 0);
  }

  return 0;
};

export const getItemList = createSelector(
  [
    state => getField(state.focused),
    state => getFilters(state),
    selectProp('search'),
    selectProp('lang'),
  ],
  (dataField, filters, search, lang = 'en') => {
    return Object.values(content[dataField])
      .filter(item => {
        const filterResult = Object.entries(filters).every(([key, value]) => {
          if (value.length === 0) return true;

          if (key === 'type') {
            return item.icon.some(icon => value.includes(icon.image));
          }

          return value.includes(item[key]);
        });

        const searchResult = item.name[lang]
          .toUpperCase()
          .includes(search.toUpperCase());

        return filterResult && searchResult;
      })
      .sort((item1, item2) => {
        if (item1.rarity > item2.rarity) return -1;
        if (item1.rarity < item2.rarity) return 1;

        if (item1.element) {
          const element1 = ELEMENT_TYPES.indexOf(item1.element);
          const element2 = ELEMENT_TYPES.indexOf(item2.element);
          if (element1 < element2) return -1;
          if (element1 > element2) return 1;
        }

        if (item1.weapon) {
          const weapon1 = WEAPON_TYPES.indexOf(item1.weapon);
          const weapon2 = WEAPON_TYPES.indexOf(item2.weapon);
          if (weapon1 < weapon2) return -1;
          if (weapon1 > weapon2) return 1;
        }

        if (dataField === 'wyrmprint') {
          if (item1.enemy && !item2.enemy) return -1;
          if (!item1.enemey && item2.enemy) return 1;
        }

        if (
          sumArray(item1.max) + sumArray(item1.might) >
          sumArray(item2.max) + sumArray(item2.might)
        ) {
          return -1;
        }

        if (
          sumArray(item1.max) + sumArray(item1.might) <
          sumArray(item2.max) + sumArray(item2.might)
        ) {
          return 1;
        }

        return 0;
      });
  }
);

export const getItemFields = createSelector(
  state => state.focused,
  focused => {
    if (focused === 'adventurer') {
      return ['level', 'curRarity', 'augHp', 'augStr', 'mana', 'ex'];
    }

    if (focused === 'dragon') {
      return ['level', 'unbind', 'augHp', 'augStr', 'bond'];
    }

    return ['level', 'unbind', 'augHp', 'augStr'];
  }
);
