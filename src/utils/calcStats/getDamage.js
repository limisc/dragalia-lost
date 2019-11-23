import { createSelector } from 'reselect';
import { ENEMY_INFO, ELEMENTS_MODIFIER, ITEM_KEYS } from 'data';
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
    const { def, exDef, exHp, hp, enemy, str, multiplier } = settings;
    const { element: enemyEle } = ENEMY_INFO[enemy];

    let modifier = 1;
    switch (element) {
      case ELEMENTS_MODIFIER[enemyEle].dis:
        modifier = 0.5;
        break;
      case ELEMENTS_MODIFIER[enemyEle].adv:
        modifier = 1.5;
        break;
      default:
        break;
    }

    let printDef = 0;
    let printRes = 0;
    let printReduce = 0;

    let totalDef = Number(def) + Number(exDef);
    let totalRes = 0;

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
      printReduce = WYRMPRINT_MAX_REDUCE;
    }

    const base =
      ((5 / 3) *
        str *
        multiplier *
        modifier *
        (1 - printReduce * 0.01) *
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
