import LZString from 'lz-string';

export const loadState = key => {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(LZString.decompress(data));
    }
  } catch (error) {
    // ignore error
  }

  return null;
};

export const saveState = (key, data) => {
  try {
    const state = LZString.compress(JSON.stringify(data));
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
