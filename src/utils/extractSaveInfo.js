import { ITEM_KEYS } from 'data';

const extractSaveInfo = items => {
  const ret = {};
  ITEM_KEYS.forEach(key => {
    const item = items[key];
    if (item !== null) {
      const {
        Id,
        level,
        augHp = '',
        augStr = '',
        curRarity,
        mana,
        ex,
        unbind,
        bond,
      } = item;

      let payload = {
        Id,
        level,
        augHp,
        augStr,
      };

      if (key === 'adventurer') {
        payload = {
          ...payload,
          curRarity,
          mana,
          ex,
        };
      } else if (key === 'dragon') {
        payload = {
          ...payload,
          unbind,
          bond,
        };
      } else {
        payload.unbind = unbind;
      }

      ret[key] = payload;
    }
  });
  return ret;
};

export default extractSaveInfo;
