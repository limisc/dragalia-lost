import { actionTypes } from 'actions';

const panelReducer = (panel, { type, payload }) => {
  if (type === actionTypes.SET_PANEL) {
    return payload;
  }

  return panel;
};

export default panelReducer;
