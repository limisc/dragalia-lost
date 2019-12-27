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
  tree: 15,
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
    '6': [100, 125, 150, 175, 200],
  },
  wyrmprint: {
    '3': [20, 30, 40, 50, 60],
    '4': [30, 40, 50, 65, 80],
    '5': [40, 55, 70, 85, 100],
  },
};

const getLimit = (key, rarity, unbind = 4) => {
  switch (key) {
    case 'augHp':
    case 'augStr':
      return LIMIT.augments;
    case 'wyrmprint1':
    case 'wyrmprint2':
      return LIMIT.wyrmprint[rarity][unbind];
    case 'dragon':
    case 'weapon':
      return LIMIT[key][rarity][unbind];
    case 'adventurer':
    case 'mana':
      return LIMIT[key][rarity];
    default:
      return LIMIT[key] || 30;
  }
};

export default getLimit;
