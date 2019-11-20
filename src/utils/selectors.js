import { createSelector } from 'reselect';
import content from 'data';
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
        return ['rarity', 'element'];
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
          if (item1.element < item2.element) return -1;
          if (item1.element > item2.element) return 1;
        }

        if (item1.weapon) {
          if (item1.weapon < item2.weapon) return -1;
          if (item1.weapon > item2.weapon) return 1;
        }

        if (item1.max[0] + item1.max[1] > item2.max[0] + item2.max[1]) {
          return -1;
        }
        if (item1.max[0] + item1.max[1] < item2.max[0] + item2.max[1]) {
          return 1;
        }

        return 0;
      });
  }
);
