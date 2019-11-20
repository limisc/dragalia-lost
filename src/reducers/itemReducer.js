import { actionTypes } from 'actions';
import createReducer from './createReducer';

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
  if (itemKey === 'weapon' && adventurer && adventurer.weapon !== item.weapon) {
    // if weapon.weapon !== advanturer.weapon, remove adventurer
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

const itemReducer = createReducer({
  [actionTypes.SELECT_ITEM]: select,
});

export default itemReducer;
