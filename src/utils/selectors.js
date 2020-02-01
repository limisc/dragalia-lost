import createCachedSelector from 're-reselect';
import content, { ELEMENT_TYPES, HALIDOM_LIST, WEAPON_TYPES } from 'data';
import getField from './getField';

export const getFilterFields = key => {
  switch (key) {
    case 'adventurer':
    case 'weapon':
      return ['Rarity', 'Element', 'Weapon'];
    case 'dragon':
      return ['Rarity', 'Element'];
    default:
      return ['Rarity', 'Type'];
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

              if (key === 'Type') {
                return item.Icon.some(({ Image }) => Image === opt.value);
              }

              return opt.value === item[key];
            }

            return false;
          });

          return ret || noChecked;
        });

        const searchLower = search.toUpperCase();

        const searchResult =
          item.Abbr.toUpperCase().includes(searchLower) ||
          item.Name[lang].toUpperCase().includes(searchLower);
        return filterResult && searchResult;
      })
      .sort((item1, item2) => {
        if (item1.Rarity > item2.Rarity) return -1;
        if (item1.Rarity < item2.Rarity) return 1;

        if (item1.Element) {
          const element1 = ELEMENT_TYPES.indexOf(item1.Element);
          const element2 = ELEMENT_TYPES.indexOf(item2.Element);
          if (element1 < element2) return -1;
          if (element1 > element2) return 1;
        }

        if (item1.Weapon) {
          const weapon1 = WEAPON_TYPES.indexOf(item1.Weapon);
          const weapon2 = WEAPON_TYPES.indexOf(item2.Weapon);
          if (weapon1 < weapon2) return -1;
          if (weapon1 > weapon2) return 1;
        }

        if (field === 'wyrmprint') {
          if (item1.Enemy && !item2.Enemy) return -1;
          if (!item1.Enemy && item2.Enemy) return 1;
        }

        if (
          sumProps(item1.Max, item1.Might) > sumProps(item2.Max, item2.Might)
        ) {
          return -1;
        }

        if (
          sumProps(item1.Max, item1.Might) < sumProps(item2.Max, item2.Might)
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

export const getFilteredHalidomKey = createCachedSelector(
  state => state.items,
  items => {
    const { adventurer, dragon } = items;
    if (adventurer === null) return null;
    const { Element, Weapon } = adventurer;
    const { Element: dragonEle } = dragon || {};

    let filters;

    if (Element === dragonEle) {
      filters = [Element, Weapon];
    } else if (!dragonEle) {
      filters = [`adventurer_${Element}`, Weapon];
    } else {
      filters = [`adventurer_${Element}`, Weapon, `dragon_${dragonEle}`];
    }

    return HALIDOM_LIST.filter(key => filters.some(f => key.includes(f)));
  }
)(state => {
  const { adventurer, dragon } = state.items;
  if (adventurer === null) return 'NONE';
  const { Element, Weapon } = adventurer;
  const { Element: dragonEle } = dragon || {};
  return `${Element}_${Weapon}_${dragonEle}`;
});
