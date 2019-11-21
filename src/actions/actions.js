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

export const selectFocus = itemKey => (dispatch, getState) => {
  dispatch({
    itemKey,
    type: actionTypes.SELECT_FOCUS,
  });

  const { adventurer } = getState().items;

  if (itemKey === 'adventurer') {
    dispatch(resetOptions());
  } else if (itemKey === 'wyrmprint1' || itemKey === 'wyrmprint2') {
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

export const updateItem = createAction(actionTypes.UPDATE_ITEM);
