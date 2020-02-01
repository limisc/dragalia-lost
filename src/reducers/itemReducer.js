import { actionTypes } from 'actions';
import initState from 'store/state';
import createReducer from './createReducer';

const reset = () => {
  return initState.items;
};

const select = (items, { itemKey, item }) => {
  if (item == null) {
    return {
      ...items,
      [itemKey]: null,
    };
  }

  if (itemKey === 'build') {
    return {
      ...items,
      ...item,
    };
  }

  const { adventurer } = items;
  const updates = {};
  if (itemKey === 'weapon' && adventurer && adventurer.Weapon !== item.Weapon) {
    // if adventurer.Weapon !== item.Weapon, remove adventurer
    updates.adventurer = null;
  } else if (itemKey === 'wyrmprint1' || itemKey === 'wyrmprint2') {
    // can't equip two same wyrmprints.
    const complement = {
      wyrmprint1: 'wyrmprint2',
      wyrmprint2: 'wyrmprint1',
    };

    const key = complement[itemKey];
    if (items[key] && items[key].Id === item.Id) {
      updates[key] = null;
    }
  }

  return {
    ...items,
    ...updates,
    [itemKey]: item,
  };
};

const update = (items, { itemKey, updates }) => {
  return {
    ...items,
    [itemKey]: {
      ...items[itemKey],
      ...updates,
    },
  };
};

const itemReducer = createReducer({
  [actionTypes.RESET_ITEMS]: reset,
  [actionTypes.SELECT_ITEM]: select,
  [actionTypes.UPDATE_ITEM]: update,
});

export default itemReducer;
