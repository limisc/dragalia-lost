import deepmerge from 'deepmerge';
import {
  extractSaveInfo,
  getLimit,
  loadState,
  saveState,
  removeState,
} from 'utils';
import { initHalidom } from 'data';
import actionTypes from './actionTypes';
import { buildItems, loadItems, modifyNewItem, randomBuild } from './itemUtils';

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

export const setTheme = createAction(actionTypes.SET_THEME);

export const updateItem = createAction(actionTypes.UPDATE_ITEM);

export const updateHalidom = createAction(actionTypes.UPDATE_HALIDOM);

export const selectFocus = itemKey => (dispatch, getState) => {
  const {
    focused,
    items: { adventurer },
  } = getState();

  dispatch(setPanel(false));

  if (focused === itemKey) {
    dispatch({
      itemKey,
      item: null,
      type: actionTypes.SELECT_ITEM,
    });
  }

  dispatch({ itemKey, type: actionTypes.SELECT_FOCUS });

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
    item: newItem,
    itemKey: key,
    type: actionTypes.SELECT_ITEM,
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
  let backup = await loadState('dragalialost-halidom');
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

export const saveBuild = () => (dispatch, getState) => {
  const { items } = getState();
  if (items.adventurer === null) return;

  const build = extractSaveInfo(items);

  dispatch({
    build,
    type: actionTypes.SAVE_BUILD,
  });

  saveState('dragalialost-build-id', build.adventurer.Id);

  const { builds } = getState();
  saveState('dragalialost-builds', builds);
};

export const delBuild = id => (dispatch, getState) => {
  dispatch({
    id,
    type: actionTypes.DEL_BUILD,
  });

  const { builds } = getState();

  if (builds !== null) {
    const keys = Object.keys(builds);
    const index = Math.floor(keys.length * Math.random());
    saveState('dragalialost-build-id', keys[index]);
    saveState('dragalialost-builds', builds);
  } else {
    removeState('dragalialost-build-id');
    removeState('dragalialost-builds');
  }
};

export const loadBuild = build => dispatch => {
  const items = loadItems(build);
  dispatch({
    item: items,
    itemKey: 'build',
    type: actionTypes.SELECT_ITEM,
  });
};

export const loadBuilds = () => async dispatch => {
  const builds = await loadState('dragalialost-builds');
  if (builds === null) {
    const item = randomBuild();
    dispatch(selectItem('adventurer', item));
  } else {
    dispatch({
      builds,
      type: actionTypes.LOAD_BUILDS,
    });

    const id = loadState('dragalialost-build-id');
    if (id !== null) {
      const build = builds[id];
      dispatch(loadBuild(build));
    }
  }
};
