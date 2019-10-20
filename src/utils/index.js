import React from 'react';
import { offset } from 'styles/styles.scss';
import locales from 'locales';
import refs from './refs';
import getLimit from './getLimit';

export { getLimit, refs };

export const loadState = key => {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    // ignore error
  }

  return null;
};

export const saveState = (key, data) => {
  try {
    const state = JSON.stringify(data);

    localStorage.setItem(key, state);
  } catch (error) {
    // ignore error
  }
};

export const removeState = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // ignore error
  }
};

/**
 * @param {number} value
 * @returns {number}
 */
export const calcVal = value => {
  const tolerance = 0.00001;
  const round = Math.round(value);
  if (Math.abs(value - round) < tolerance) {
    return round;
  }

  return Math.ceil(value);
};

/**
 * @param {string} key
 */
export const getField = key => {
  if (key === 'wyrmprint1' || key === 'wyrmprint2') {
    return 'wyrmprint';
  }

  return key;
};

/**
 * @param {Object} item
 * @param {string} key
 * @returns {string}
 */
export const getImage = (item, key) => {
  if (!item || !item.id) return 'add';

  const { id } = item;
  const field = getField(key);
  switch (field) {
    case 'adventurer': {
      const r = item.curRarity || item.rarity;
      return `${id}_r0${r}`;
    }
    case 'wyrmprint':
    case 'wyrmprint1':
    case 'wyrmprint2': {
      const stage = item.unbind < 2 ? 1 : 2;
      return `${id}_0${stage}`;
    }
    default:
      return id;
  }
};

export const reducerCreator = handler => (action, state, ...args) => {
  if (Object.prototype.hasOwnProperty.call(handler, action.type)) {
    return handler[action.type](action, state, ...args);
  }

  return state;
};

export const scrollTo = (point, special = false) => {
  setTimeout(() => {
    let top = 0;
    if (typeof point === 'number') {
      top = point;
    } else if (point && point.current) {
      const offsetLength = special ? 184 : parseInt(offset, 10);
      top = point.current.offsetTop - offsetLength;
    }

    window.scrollTo({ top, behavior: 'smooth' });
  }, 0);
};

/**
 * @param {string} text
 * @param {string} lang
 * @param {string} section
 */
export const translate = (text, lang, section = 'ui') => {
  const field = getField(section);

  let checked = text;

  if (field === 'adventurer' || field === 'dragon') {
    [checked] = text.split('_');
  }

  const item = locales[field][checked];

  if (item) {
    return item[lang] || item.en;
  }

  return text;
};

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * @param {function} fn
 */
export const useEventCallback = fn => {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });

  return React.useCallback(event => (0, ref.current)(event), []);
};
