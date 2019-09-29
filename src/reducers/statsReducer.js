import { actionTypes } from 'actions';
import content, { defaultEquipments, STATS_KEYS } from 'data';
import { getLimit, getField, reducerCreator } from 'utils';
import initState from '../store/state';

/**
 * @param {string} key
 * @param {Object} item
 */
const buildItem = (key, item) => {
  if (!item) return null;

  const rarity = key === 'adventurer' ? '5' : item.rarity;
  const field = getField(key);
  const level = getLimit(`${field}_${rarity}`);

  let updates = {};
  switch (field) {
    case 'adventurer': {
      updates = {
        curRarity: rarity,
        mana: '50',
        ex: '4',
      };
      break;
    }
    case 'dragon': {
      updates = {
        bond: '30',
        unbind: '4',
      };
      break;
    }
    default: {
      updates.unbind = '4';
    }
  }

  return { ...item, ...updates, level };
};

/**
 * @param {Object} stats
 */
const resetStats = (_, stats) => {
  if (STATS_KEYS.some(el => stats[el] !== null)) {
    return initState.stats;
  }

  return stats;
};

/**
 * @param {Object} action
 * @param {string} [action.statsKey]
 * @param {string} [action.payload]
 * @param {Object} [action.item]
 * @param {Object} stats
 */
const selectItem = ({ payload, statsKey, item }, stats) => {
  if (payload) return { ...stats, [payload]: null };
  if (!item) return { ...stats, [statsKey]: null };

  if (statsKey === 'team') {
    return item;
  }

  if (stats[statsKey] && item && stats[statsKey].id === item.id) {
    return stats;
  }

  const updates = {};

  const { adventurer, wyrmprint1, wyrmprint2 } = stats;

  // if select adventurer, auto equip weapon, wyrmprint and dragon
  if (statsKey === 'adventurer') {
    const { element, weapon } = item;

    // get default weapon & dragon
    if (
      !adventurer ||
      element !== adventurer.element ||
      weapon !== adventurer.weapon
    ) {
      const weaponId = defaultEquipments[`${weapon}_${element}`];
      const dragonId = defaultEquipments[`dragon_${element}`];

      updates.weapon = buildItem('weapon', content.weapon[weaponId]);
      updates.dragon = buildItem('dragon', content.dragon[dragonId]);
    }

    // get default wyrmprint
    if (!wyrmprint1 && !wyrmprint2) {
      const w1Id = defaultEquipments.wyrmprint1;
      const w2Id = defaultEquipments.wyrmprint2;

      updates.wyrmprint1 = buildItem('wyrmprint', content.wyrmprint[w1Id]);
      updates.wyrmprint2 = buildItem('wyrmprint', content.wyrmprint[w2Id]);
    }
  } else if (
    // if weapon.weapon !== advanturer.weapon, remove adventurer
    statsKey === 'weapon' &&
    adventurer &&
    adventurer.weapon !== item.weapon
  ) {
    updates.adventurer = null;
  } else if (statsKey === 'wyrmprint1' || statsKey === 'wyrmprint2') {
    // can't equipt the same wyrmprint.
    const complement = {
      wyrmprint1: 'wyrmprint2',
      wyrmprint2: 'wyrmprint1',
    };

    const key = complement[statsKey];
    const wyrmprint = stats[key];
    if (wyrmprint && wyrmprint.id === item.id) {
      updates[key] = null;
    }
  }

  const newItem = buildItem(statsKey, item);
  return { ...stats, ...updates, [statsKey]: newItem };
};

const checkItem = ({ statsKey, updates }, stats) => {
  return {
    ...stats,
    [statsKey]: {
      ...stats[statsKey],
      ...updates,
    },
  };
};

const statsReducer = reducerCreator({
  [actionTypes.RESET_STATS]: resetStats,
  [actionTypes.SELECT_ITEM]: selectItem,
  [actionTypes.UPDATE_ITEM]: checkItem,
});

export default statsReducer;
