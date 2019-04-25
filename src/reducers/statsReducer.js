import { equipments } from 'data';
import { actionTypes, reducerCreator, getItem, getLimit } from '../actions';

const buildItem = (statsKey, item) => {
  if (item) {
    const rarity = statsKey === 'adventurer' ? '5' : item.rarity;
    let updates = {};
    const level = getLimit(statsKey, rarity);

    switch (statsKey) {
      case 'adventurer':
        updates = {
          curRarity: rarity,
          mana: '50',
          ex: '4',
        };
        break;
      case 'dragon':
        updates = {
          bond: '30',
          unbind: '4',
        };
        break;
      default:
        updates.unbind = '4';
        break;
    }

    return {
      ...item,
      ...updates,
      level,
    };
  }

  return item;
};

const selectStats = (stats, action) => {
  const { statsKey, item } = action;

  if (stats[statsKey] && item && stats[statsKey].id === item.id) {
    return stats;
  }

  const updates = {};
  if (item) {
    const { adventurer, wyrmprint1, wyrmprint2 } = stats;

    if (statsKey === 'adventurer') {
      const { weapon, element } = item;

      if (!adventurer || weapon !== adventurer.weapon || element !== adventurer.element) {
        const weaponId = equipments.weapon[weapon][element];
        updates.weapon = buildItem('weapon', getItem('weapon', weaponId));
      }

      if (!wyrmprint1 && !wyrmprint2) {
        updates.wyrmprint1 = buildItem('wyrmprint1', getItem('wyrmprint', equipments.wyrmprint1));
        updates.wyrmprint2 = buildItem('wyrmprint2', getItem('wyrmprint', equipments.wyrmprint2));
      }

      if (!adventurer || element !== adventurer.element) {
        const dragonId = equipments.dragon[element];
        updates.dragon = buildItem('dragon', getItem('dragon', dragonId));
      }
    } else if (statsKey === 'weapon' && adventurer && adventurer.weapon !== item.weapon) {
      updates.adventurer = null;
    } else if (statsKey === 'wyrmprint1' || statsKey === 'wyrmprint2') {
      //can't equipt the same wyrmprint.
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
  }

  return {
    ...stats,
    ...updates,
    [statsKey]: buildItem(statsKey, item),
  };
};

const updateStats = (stats, action) => {
  const { statsKey, updates } = action;

  return {
    ...stats,
    [statsKey]: {
      ...stats[statsKey],
      ...updates,
    },
  };
};

const statsReducer = reducerCreator({
  [actionTypes.SELECT_STATS]: selectStats,
  [actionTypes.UPDATE_STATS]: updateStats,
});

export default statsReducer;
