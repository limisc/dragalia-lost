import { actionTypes } from 'actions';
import { setColor } from 'utils';

const themeReducer = (theme, { type, payload }) => {
  if (type === actionTypes.SET_THEME) {
    const color = setColor(payload);
    if (color === null) return theme;
    return color;
  }

  return theme;
};

export default themeReducer;
