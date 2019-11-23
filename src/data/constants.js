export const ADVENTURER_ABILITY = {
  '5': {
    '0': [],
    '10': [1, 3],
    '20': [1, 3, 5],
    '30': [0, 3, 5],
    '40': [0, 2, 5],
    '45': [0, 2, 4],
    '50': [0, 2, 4],
  },
  rest: {
    '0': [],
    '10': [1, 3],
    '20': [1, 3],
    '30': [0, 3],
    '40': [0, 2],
    '45': [0, 2, 4],
    '50': [0, 2, 4],
  },
};

export const COABILITY_VALUE = {
  Axe: {
    '3': [5, 7, 9, 11, 15],
    '4': [7, 8, 9, 11, 15],
    '5': [9, 10, 11, 12, 15],
  },
  Lance: {
    '3': [5, 7, 9, 12, 15],
    '4': [7, 8, 9, 12, 15],
    '5': [9, 10, 12, 13, 15],
  },
  Staff: {
    '3': [2, 6, 10, 14, 20],
    '4': [6, 8, 10, 14, 20],
    '5': [10, 12, 14, 16, 20],
  },
};

export const MIGHT_DICT = {
  adventurerSkill: {
    '0': 100,
    '10': 100,
    '20': 200, // 100 + 100,
    '30': 300, // 200 + 100,
    '40': 400, // 200 + 200,
    '45': 500, // 300 + 200,
    '50': 500, // 300 + 200,
  },
  coAbility: {
    '3': [50, 110, 170, 230, 320],
    '4': [110, 140, 170, 230, 320],
    '5': [170, 200, 230, 260, 320],
  },
  fs: {
    '10': 60,
    '40': 120,
  },
  itemSkill: [100, 50],
};

export const ELEMENTS_MODIFIER = {
  // advantage: adv, disadvantage: dis
  Flame: {
    adv: 'Wind',
    dis: 'Water',
  },
  Water: {
    adv: 'Flame',
    dis: 'Wind',
  },
  Wind: {
    adv: 'Water',
    dis: 'Flame',
  },
  Light: {
    adv: 'Shadow',
    dis: 'Shadow',
  },
  Shadow: {
    adv: 'Light',
    dis: 'Light',
  },
};

export const ITEM_KEYS = [
  'adventurer',
  'weapon',
  'dragon',
  'wyrmprint1',
  'wyrmprint2',
];

export const ELEMENT_TYPES = ['Flame', 'Water', 'Wind', 'Light', 'Shadow'];

export const WEAPON_TYPES = [
  'Sword',
  'Blade',
  'Dagger',
  'Axe',
  'Lance',
  'Bow',
  'Wand',
  'Staff',
];

export const ABILITY_TYPES = [
  '1020001',
  '1020002',
  '1020003',
  '1010002',
  '1020010',
  '1020011',
  '1010001',
  '1010007',
];

export const RARITY_TYPES = ['3', '4', '5'];
