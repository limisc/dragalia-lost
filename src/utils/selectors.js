import createCachedSelector from 're-reselect';
import content, { ELEMENT_TYPES, WEAPON_TYPES } from 'data';
import getField from './getField';

export const getFilterFields = key => {
  switch (key) {
    case 'adventurer':
    case 'weapon':
      return ['rarity', 'element', 'weapon'];
    case 'dragon':
      return ['rarity', 'element', 'type'];
    default:
      return ['rarity', 'type'];
  }
};

const sumProps = (...arrays) => {
  let sum = 0;

  arrays.forEach(array => {
    if (Array.isArray(array)) {
      sum += array.reduce((acc, cur) => acc + cur, 0);
    }
  });

  return sum;
};

export const getItemList = createCachedSelector(
  state => getField(state.focused),
  state => state.options,
  (_, props) => props.search,
  (_, props) => props.lang,
  (field, options, search, lang = 'en') => {
    const fields = getFilterFields(field);

    return Object.values(content[field])
      .filter(item => {
        const filterResult = fields.every(key => {
          let noChecked = true;

          const ret = options[key].some(opt => {
            if (opt.checked) {
              noChecked = false;

              if (key === 'type') {
                return item.icon.some(({ image }) => image === opt.value);
              }

              return opt.value === item[key];
            }

            return false;
          });

          return ret || noChecked;
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

        if (field === 'wyrmprint') {
          if (item1.enemy && !item2.enemy) return -1;
          if (!item1.enemey && item2.enemy) return 1;
        }

        if (
          sumProps(item1.max, item1.might) > sumProps(item2.max, item2.might)
        ) {
          return -1;
        }

        if (
          sumProps(item1.max, item1.might) < sumProps(item2.max, item2.might)
        ) {
          return 1;
        }

        return 0;
      });
  }
)(state => {
  const field = getField(state.focused);
  const fields = getFilterFields(field);

  const array = [field];

  fields.forEach(key => {
    state.options[key].forEach(opt => {
      if (opt.checked) {
        array.push(opt.value);
      }
    });
  });
  return array.join('_');
});
