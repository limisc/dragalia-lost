export const ADVENTURER_ABILITY = {
  '5_0': [],
  '5_10': ['abilities11', 'abilities21'],
  '5_20': ['abilities11', 'abilities21', 'abilities31'],
  '5_30': ['abilities12', 'abilities21', 'abilities31'],
  '5_40': ['abilities12', 'abilities22', 'abilities31'],
  '5_45': ['abilities12', 'abilities22', 'abilities32'],
  '5_50': ['abilities12', 'abilities22', 'abilities32'],
  rest_0: [],
  rest_10: ['abilities11', 'abilities21'],
  rest_20: ['abilities11', 'abilities21'],
  rest_30: ['abilities12', 'abilities21'],
  rest_40: ['abilities12', 'abilities22'],
  rest_45: ['abilities12', 'abilities22', 'abilities31'],
  rest_50: ['abilities12', 'abilities22', 'abilities31'],
};

export const COABILITY_DICT = {
  Axe_3: [5, 7, 9, 11, 15],
  Axe_4: [7, 8, 9, 11, 15],
  Axe_5: [9, 10, 11, 12, 15],
  Lance_3: [5, 7, 9, 12, 15],
  Lance_4: [7, 8, 9, 12, 15],
  Lance_5: [9, 10, 12, 13, 15],
  Staff_3: [2, 6, 10, 14, 20],
  Staff_4: [6, 8, 10, 14, 20],
  Staff_5: [10, 12, 14, 16, 20],
};

export const ELEMENTS_MODIFIER = {
  // advantage: ad, disadvantage: da
  Flame: {
    ad: 'Wind',
    da: 'Water',
  },
  Water: {
    ad: 'Flame',
    da: 'Wind',
  },
  Wind: {
    ad: 'Water',
    da: 'Flame',
  },
  Light: {
    ad: 'Shadow',
    da: 'Shadow',
  },
  Shadow: {
    ad: 'Light',
    da: 'Light',
  },
};

export const LIMIT = {
  adventurer: {
    '3': 60,
    '4': 70,
    '5': 80,
  },
  altar: 35,
  augHp: 100,
  augStr: 100,
  dojo: 35,
  event: 35, // facility page
  eventE: 35,
  dracolith: 20,
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
  slime: 15,
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

export const MIGHT_DICT = {
  adventurerSkill_0: 100,
  adventurerSkill_10: 100,
  adventurerSkill_20: 200, // 100+100,
  adventurerSkill_30: 300, // 200+100,
  adventurerSkill_40: 400, // 200+200,
  adventurerSkill_45: 500, // 300+200,
  adventurerSkill_50: 500, // 300+200,
  coAbility_3_0: 50,
  coAbility_3_1: 110,
  coAbility_3_2: 170,
  coAbility_3_3: 230,
  coAbility_3_4: 320,
  coAbility_4_0: 110,
  coAbility_4_1: 140,
  coAbility_4_2: 170,
  coAbility_4_3: 230,
  coAbility_4_4: 320,
  coAbility_5_0: 170,
  coAbility_5_1: 200,
  coAbility_5_2: 230,
  coAbility_5_3: 260,
  coAbility_5_4: 320,
  fs_10: 60,
  fs_40: 120,
  itemSkill_0: 50,
  itemSkill_4: 100,
};

export const STATS_KEYS = [
  'adventurer',
  'weapon',
  'wyrmprint1',
  'wyrmprint2',
  'dragon',
];

export const RARITIES = ['3', '4', '5'];

export const ELEMENTS = ['Flame', 'Water', 'Wind', 'Light', 'Shadow'];

export const WEAPONS = [
  'Sword',
  'Blade',
  'Dagger',
  'Axe',
  'Lance',
  'Bow',
  'Wand',
  'Staff',
];
