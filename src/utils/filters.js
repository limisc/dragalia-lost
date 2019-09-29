import { RARITIES, ELEMENTS, WEAPONS } from 'data';

const getArr = name => {
  switch (name) {
    case 'rarity':
      return RARITIES;
    case 'element':
      return ELEMENTS;
    case 'weapon':
      return WEAPONS;
    default:
      return null;
  }
};

/**
 * @param {string} name
 * @param {[string]} [checked]
 */
export const makeCheckedArr = (name, checked) => {
  const arr = getArr(name);
  if (arr) {
    if (checked && Array.isArray(checked)) {
      return arr.map(label => ({ label, checked: checked.includes(label) }));
    }

    return arr.map(label => ({ label, checked: false }));
  }

  return null;
};

export const makeFilters = ({ arr, name, disabled = false }) => {
  if (disabled || !arr || !Array.isArray(arr)) return [];

  let ret = arr.reduce(
    (prev, curr) => (curr.checked ? [...prev, curr.label] : prev),
    []
  );

  if (ret.length === 0) ret = getArr(name);

  return ret;
};

export const clearCheckedArr = arr => {
  if (arr && Array.isArray(arr)) {
    return arr.map(item => ({ ...item, checked: false }));
  }

  return null;
};
