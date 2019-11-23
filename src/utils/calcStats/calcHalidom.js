import { HALIDOM_LIST, HALIDOM_VALUES } from 'data';
import calcVal from '../calcVal';
import includes from '../includes';

const calcPct = (halidom, keys) => {
  let hpPct = 0;
  let strPct = 0;

  if (keys !== null) {
    keys.forEach(key => {
      if (includes(halidom, key)) {
        const { type, level } = halidom[key];
        const [v1, v2] = HALIDOM_VALUES[type][level];
        hpPct += v1;
        strPct += v2;
      }
    });
  }

  return { hpPct, strPct };
};

const calcItemCareHalidom = (itemKey, item, halidom) => {
  if (item === null) return null;

  let keys = null;
  const { element, hp, str, augHp, augStr } = item;

  if (itemKey === 'adventurer') {
    const filters = [`adventurer_${element}`, item.weapon];
    keys = HALIDOM_LIST.filter(key => filters.some(f => key.includes(f)));
  } else if (itemKey === 'dragon') {
    const id = `dragon_${element}`;
    keys = HALIDOM_LIST.filter(key => key.includes(id));
  }

  const { hpPct, strPct } = calcPct(halidom, keys);
  const halidomHp = calcVal((hp + augHp) * hpPct * 0.01);
  const halidomStr = calcVal((str + augStr) * strPct * 0.01);

  return {
    ...item,
    halidomHp,
    halidomStr,
  };
};

export default calcItemCareHalidom;
