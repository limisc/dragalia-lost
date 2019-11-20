const LIMIT = {
  adventurer: {
    '3': 60,
    '4': 70,
    '5': 80,
  },
  augments: 100,
  altar: 35,
  dojo: 35,
  dracolith: 20,
  event: 35,
  slime: 15,
  dragon: {
    '3': [20, 30, 40, 50, 60],
    '4': [30, 40, 50, 65, 80],
    '5': [40, 55, 70, 85, 100],
  },
  mana: {
    '3': '30',
    '4': '40',
    '5': '50',
  },
  weapon: {
    '3': [20, 25, 30, 35, 40],
    '4': [50, 55, 60, 65, 70],
    '5': [80, 85, 90, 95, 100],
  },
  wyrmprint: {
    '3': [20, 30, 40, 50, 60],
    '4': [30, 40, 50, 65, 80],
    '5': [40, 55, 70, 85, 100],
  },
};

const getLimit = (...keys) => {
  let [key] = keys;
  if (key === 'augHp' || key === 'augStr') {
    key = 'augments';
  } else if (key === 'wyrmprint1' || key === 'wyrmprint2') {
    key = 'wyrmprint';
  }

  let ret = LIMIT;
  for (let i = 0; i < keys.length; i += 1) {
    ret = ret[key];
    key = keys[i + 1];
    if (ret === undefined) break;
    if (typeof ret === 'number') return ret;
  }

  if (Array.isArray(ret)) {
    return ret[ret.length - 1];
  }

  return 30;
};

export default getLimit;
