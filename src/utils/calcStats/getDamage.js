import { createSelector } from 'reselect';
import { ENEMY_INFO, getModifier, ITEM_KEYS } from 'data';
import calcVal from '../calcVal';
import getDetails from './getDetails';

const WYRMPRINT_MAX_DEF = 20;
const WYRMPRINT_MAX_RES = 15;
const WYRMPRINT_MAX_REDUCE = 25;

const parseDamage = val => {
  const tolerance = 0.00001;
  const round = Math.round(val);
  if (Math.abs(val - round) < tolerance) {
    return round;
  }

  return Math.floor(val);
};

const getSettings = (_, props) => props.settings;

const getDamage = createSelector(
  [getDetails, getSettings],
  (details, settings) => {
    if (details === null) return null;
    const { defCoef, element } = details.adventurer;
    const {
      dcrStr,
      def,
      difficulty,
      enemy,
      exDef,
      exHp,
      hp,
      multiplier,
      res,
    } = settings;

    const { element: enemyEle, info } = ENEMY_INFO[enemy] || {};

    let str = 0;
    if (info) {
      str = info[difficulty].str;
    }

    const modifier = getModifier(enemyEle, element);

    let printDef = 0;
    let printRes = 0;
    let printReduce = 0;

    let totalDef = Number(def) + Number(exDef);
    let totalReduce = Number(0);
    let totalRes = Number(res);

    ITEM_KEYS.forEach(key => {
      const item = details[key];
      if (item !== undefined) {
        const { incDEF = 0, incRES = 0, resEle } = item;
        totalDef += incDEF;
        if (resEle === enemyEle) {
          totalRes += incRES;
        }

        if (key === 'wyrmprint1' || key === 'wyrmprint2') {
          printDef += incDEF;
          if (item.enemy === enemy) {
            totalReduce += item.incDIS;
            printReduce += item.incDIS;
          }

          if (resEle === enemyEle) {
            printRes += incRES;
          }
        }
      }
    });

    if (printDef > WYRMPRINT_MAX_DEF) {
      totalDef += WYRMPRINT_MAX_DEF - printDef;
    }

    if (printRes > WYRMPRINT_MAX_RES) {
      totalRes += WYRMPRINT_MAX_RES - printRes;
    }

    if (printReduce > WYRMPRINT_MAX_REDUCE) {
      totalReduce += WYRMPRINT_MAX_REDUCE - printReduce;
    }

    const base =
      ((5 / 3) *
        str *
        (1 - dcrStr * 0.01) *
        multiplier *
        modifier *
        (1 - totalReduce * 0.01) *
        (1 - totalRes * 0.01)) /
      (defCoef * (1 + totalDef * 0.01));

    const totalHp = calcVal(
      details.total.hp * (1 + hp * 0.01) * (1 + exHp * 0.01)
    );

    const min = parseDamage(base * 0.95);
    const max = parseDamage(base * 1.05);

    return {
      min,
      max,
      hp: totalHp,
    };
  }
);

export default getDamage;
