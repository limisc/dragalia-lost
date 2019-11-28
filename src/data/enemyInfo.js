export const ENEMY_INFO = {
  hms: {
    element: 'Wind',
    info: {
      N: { str: 3253, multiplier: 2.3 },
      H: { str: 7230, multiplier: 3.6 },
      VH: { str: 9000, multiplier: 3.7 },
      EX: { str: 13000, multiplier: 3.4 },
    },
  },
  hbh: {
    element: 'Flame',
    info: {
      N: { str: 3253, multiplier: 2 },
      H: { str: 7230, multiplier: 4.8 },
      VH: { str: 9000, multiplier: 4.75 },
      EX: { str: 13000, multiplier: 3.5 },
    },
  },
  hmc: {
    element: 'Water',
    info: {
      N: { str: 7230, multiplier: 1.1 },
      H: { str: 7230, multiplier: 2.75 },
      VH: { str: 9000, multiplier: 3.2 },
      EX: { str: 13000, multiplier: 3.1 },
    },
  },
  hjp: {
    element: 'Light',
    info: {
      N: { str: 7230, multiplier: 0.7 },
      H: { str: 7230, multiplier: 4.4 },
      VH: { str: 9000, multiplier: 4.2 },
      EX: { str: 13000, multiplier: 4.6 },
    },
  },
  hzd: {
    element: 'Shadow',
    info: {
      N: { str: 7996, multiplier: 0.7 },
      H: { str: 7996, multiplier: 4.4 },
      VH: { str: 8386, multiplier: 4.4 },
      EX: { str: 9000, multiplier: 4 },
    },
  },
};

const ELEMENTS_MODIFIER = {
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

export const getModifier = (enemyEle, element) => {
  const { adv, dis } = ELEMENTS_MODIFIER[enemyEle] || {};
  if (dis === element) {
    return 0.5;
  }

  if (adv === element) {
    return 1.5;
  }

  return 1;
};

export const ELEMENT_ADV_TO_ENEMY = {
  Flame: 'hms',
  Water: 'hbh',
  Wind: 'hmc',
  Light: 'hzd',
  Shadow: 'hjp',
};
