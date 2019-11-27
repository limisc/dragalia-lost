import deepmerge from 'deepmerge';
import { getLimit, loadState } from 'utils';
import { initHalidom } from 'data';
import actionTypes from './actionTypes';
import { buildItems, modifyNewItem } from './itemUtils';

const createAction = type => params => {
  if (params == null) return { type };

  if (typeof params === 'object') {
    return { type, ...params };
  }

  return { type, payload: params };
};

export const resetOptions = createAction(actionTypes.RESET_OPTIONS);

export const selectOption = createAction(actionTypes.SELECT_OPTION);

export const setPanel = createAction(actionTypes.SET_PANEL);

export const updateItem = createAction(actionTypes.UPDATE_ITEM);

export const updateHalidom = createAction(actionTypes.UPDATE_HALIDOM);

export const selectFocus = itemKey => (dispatch, getState) => {
  dispatch(setPanel(false));

  dispatch({ itemKey, type: actionTypes.SELECT_FOCUS });

  const { adventurer } = getState().items;

  if (itemKey === 'adventurer') {
    dispatch(resetOptions());
  } else if (
    itemKey === 'dragon' ||
    itemKey === 'wyrmprint1' ||
    itemKey === 'wyrmprint2'
  ) {
    dispatch(resetOptions('type'));
  }

  if (adventurer) {
    let groups = [];
    if (itemKey === 'weapon') {
      groups = ['element', 'weapon'];
    } else if (itemKey === 'dragon') {
      groups = ['element'];
    }

    groups.forEach(name => {
      dispatch({
        name,
        value: adventurer[name],
        type: actionTypes.LIGHT_OPTION,
      });
    });
  }
};

export const resetItems = () => dispatch => {
  dispatch(setPanel(false));
  dispatch(selectFocus('adventurer'));
  dispatch({ type: actionTypes.RESET_ITEMS });
};

export const selectItem = (itemKey, item) => (dispatch, getState) => {
  if (item == null) return;

  let key = itemKey;
  let newItem = modifyNewItem(itemKey, item);

  if (itemKey === 'adventurer') {
    key = 'build';
    const { items } = getState();
    newItem = buildItems(items, newItem);
  }

  dispatch({
    type: actionTypes.SELECT_ITEM,
    itemKey: key,
    item: newItem,
  });
};

export const maxItem = itemKey => (dispatch, getState) => {
  const {
    items: { [itemKey]: item },
  } = getState();
  if (item === null) return;

  const updates = modifyNewItem(itemKey, item);
  const max = getLimit('augments');
  updates.augHp = max;
  updates.augStr = max;
  dispatch(updateItem({ itemKey, updates }));
};

export const loadHalidom = () => async (dispatch, getState) => {
  let backup = await loadState('halidom');
  if (backup === null) return;

  if (Object.keys(backup).length !== Object.keys(initHalidom).length) {
    const { halidom } = getState();
    backup = deepmerge(halidom, initHalidom);
  }

  dispatch({
    backup,
    type: actionTypes.LOAD_HALIDOM,
  });
};
