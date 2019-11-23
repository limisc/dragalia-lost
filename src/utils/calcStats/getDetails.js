import { createSelector } from 'reselect';
import { ITEM_KEYS } from 'data';
import calcVal from '../calcVal';
import calcItem from './calcItem';
import calcItemCareHalidom from './calcHalidom';

const WYRMPRINT_MAX_HP = 8;
const WYRMPRINT_MAX_STR = 20;

const selectAdventurer = state => state.items.adventurer;
const selectHalidom = state => state.halidom;

const calcItemCareElement = (itemKey, item, adventurer) => {
  const sameEle = item && adventurer && item.element === adventurer.element;
  return calcItem(itemKey, item, sameEle);
};

const getAdventurer = createSelector(selectAdventurer, adventurer =>
  calcItem('adventurer', adventurer)
);

const getAdventurerCareHalidom = createSelector(
  [getAdventurer, selectHalidom],
  (adventurer, halidom) => {
    return calcItemCareHalidom('adventurer', adventurer, halidom);
  }
);

const getDragon = createSelector(
  [state => state.items.dragon, selectAdventurer],
  (dragon, adventurer) => calcItemCareElement('dragon', dragon, adventurer)
);

const getDragonCareHalidom = createSelector(
  [getDragon, selectHalidom],
  (dragon, halidom) => {
    return calcItemCareHalidom('dragon', dragon, halidom);
  }
);

const getWeapon = createSelector(
  [state => state.items.weapon, selectAdventurer],
  (weapon, adventurer) => calcItemCareElement('weapon', weapon, adventurer)
);

const getWyrmprint1 = createSelector(
  state => state.items.wyrmprint1,
  wyrmprint => calcItem('wyrmprint1', wyrmprint)
);

const getWyrmprint2 = createSelector(
  state => state.items.wyrmprint2,
  wyrmprint => calcItem('wyrmprint2', wyrmprint)
);

const getDetails = createSelector(
  [
    getAdventurerCareHalidom,
    getWeapon,
    getDragonCareHalidom,
    getWyrmprint1,
    getWyrmprint2,
  ],
  (...items) => {
    if (items[0] === null) return null;

    const ret = {};
    let totalHp = 0;
    let totalStr = 0;
    let totalMight = 0;

    let totalAugHp = 0;
    let totalAugStr = 0;

    let bothMUB = true;
    let printIncHp = 0;
    let printIncStr = 0;
    let totalIncHp = 0;
    let totalIncStr = 0;

    let totalHalidomHp = 0;
    let totalHalidomStr = 0;

    items.forEach((item, i) => {
      if (item !== null) {
        const { hp, str, might, augHp, augStr, incHP = 0, incSTR = 0 } = item;
        totalHp += hp;
        totalStr += str;
        totalMight += might;

        totalAugHp += augHp;
        totalAugStr += augStr;

        totalIncHp += incHP;
        totalIncStr += incSTR;

        const key = ITEM_KEYS[i];
        switch (key) {
          case 'adventurer':
          case 'dragon': {
            totalHalidomHp += item.halidomHp;
            totalHalidomStr += item.halidomStr;
            break;
          }
          case 'wyrmprint1':
          case 'wyrmprint2': {
            bothMUB = bothMUB && item.isMUB;
            printIncHp += incHP;
            printIncStr += incSTR;
            break;
          }
          default:
            break;
        }

        ret[key] = {
          ...item,
          might: might + hp + str,
        };
      }
    });

    if (printIncHp > WYRMPRINT_MAX_HP) {
      totalIncHp += WYRMPRINT_MAX_HP - printIncHp;
    }

    if (printIncStr > WYRMPRINT_MAX_STR && !bothMUB) {
      totalIncStr += WYRMPRINT_MAX_STR - printIncStr;
    }

    totalHp += totalAugHp + totalHalidomHp;
    totalStr += totalAugStr + totalHalidomStr;

    ret.augments = {
      hp: totalAugHp,
      str: totalAugStr,
      might: totalAugHp + totalAugStr,
    };

    ret.halidom = {
      hp: totalHalidomHp,
      str: totalHalidomStr,
      might: totalHalidomHp + totalHalidomStr,
    };

    totalMight += calcVal(totalHp + totalStr);

    const abilityHp = calcVal(totalHp * totalIncHp * 0.01);
    const abilityStr = calcVal(totalStr * totalIncStr * 0.01);

    ret.ability = {
      hp: abilityHp,
      str: abilityStr,
      might: 0,
    };

    totalHp += abilityHp;
    totalStr += abilityStr;

    ret.total = {
      hp: totalHp,
      str: totalStr,
      might: totalMight,
    };

    return ret;
  }
);

export default getDetails;
