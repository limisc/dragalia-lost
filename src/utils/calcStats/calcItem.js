import getLimit from '../getLimit';
import calcAbility from './calcAbility';
import calcMight from './calcMight';
import calcVal from '../calcVal';

const calcMCBonus = adventurer => {
  const { mana = '50', mcBonus } = adventurer;

  if (mana === '0') return [0, 0];

  const index = ['10', '20', '30', '40', '45', '50'].indexOf(mana);
  return mcBonus[index];
};

const calcItem = (itemKey, item, sameEle = false) => {
  if (item == null) return null;

  let { augHp = 0, augStr = 0, level, rarity } = item;

  augHp = Number(augHp);
  augStr = Number(augStr);
  level = Number(level);

  let hp = 0;
  let str = 0;

  if (itemKey === 'adventurer') {
    rarity = '5';

    const [mcHp, mcStr] = calcMCBonus(item);
    hp += mcHp;
    str += mcStr;
  }

  const MAX_LEVEL = getLimit(itemKey, rarity);

  const [maxHp, maxStr] = item.max;
  if (level === MAX_LEVEL) {
    hp += maxHp;
    str += maxStr;
  } else {
    let minHp;
    let minStr;
    let stepHp;
    let stepStr;

    if (itemKey === 'adventurer') {
      const { curRarity = '5' } = item;
      // adventurer.min: [[45, 26], [55, 32], [64, 37]]
      const r = Number(curRarity);
      [minHp, minStr] = item.min[r - 3];
      [, , [stepHp, stepStr]] = item.min;
    } else {
      // item.min: [36, 12]
      [minHp, minStr] = item.min;
      stepHp = minHp;
      stepStr = minStr;
    }

    hp += minHp + ((level - 1) / (MAX_LEVEL - 1)) * (maxHp - stepHp);
    str += minStr + ((level - 1) / (MAX_LEVEL - 1)) * (maxStr - stepStr);
  }

  hp = calcVal(hp);
  str = calcVal(str);

  if (sameEle) {
    // weapon, dragon has x1.5 bonus when matches adventurer element
    // (hp + augHp) * 1.5 - augHp = hp * 1.5 + augHp * 0.5;
    hp = calcVal(hp * 1.5 + augHp * 0.5);
    str = calcVal(str * 1.5 + augStr * 0.5);
  }

  const might = calcMight(itemKey, item);
  const ability = calcAbility(itemKey, item, sameEle);

  return {
    hp,
    str,
    might,
    augHp,
    augStr,
    ...ability,
  };
};

export default calcItem;
