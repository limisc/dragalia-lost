import { createRef } from 'react';
import { STATS_KEYS } from 'data';

const refs = (() => {
  const ret = { col3: createRef() };
  for (let i = 0; i < STATS_KEYS.length; i += 1) {
    ret[STATS_KEYS[i]] = createRef();
  }

  return ret;
})();

export default refs;
