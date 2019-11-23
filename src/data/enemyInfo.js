export const ENEMY_INFO = {
  hms: {
    element: 'Wind',
    info: [
      { str: 3253, multiplier: 2.3 },
      { str: 7230, multiplier: 3.6 },
      { str: 9000, multiplier: 3.7 },
      { str: 13000, multiplier: 3.4 },
    ],
  },
  hbh: {
    element: 'Flame',
    info: [
      { str: 3253, multiplier: 2 },
      { str: 7230, multiplier: 4.8 },
      { str: 9000, multiplier: 4.75 },
      { str: 13000, multiplier: 3.5 },
    ],
  },
  hmc: {
    element: 'Water',
    info: [
      { str: 7230, multiplier: 1.1 },
      { str: 7230, multiplier: 2.75 },
      { str: 9000, multiplier: 3.2 },
      { str: 13000, multiplier: 2.4 },
    ],
  },
  hjp: {
    element: 'Light',
    info: [
      { str: 7230, multiplier: 0.7 },
      { str: 7230, multiplier: 4.4 },
      { str: 9000, multiplier: 4.2 },
      { str: 13000, multiplier: 2.6 },
    ],
  },
  hzd: {
    element: 'Shadow',
    info: [
      { str: 7996, multiplier: 0.7 },
      { str: 7996, multiplier: 4.4 },
      { str: 8386, multiplier: 4.4 },
      { str: 9000, multiplier: 4 },
    ],
  },
};

export const ELEMENT_ADV_TO_ENEMY = {
  Flame: 'hms',
  Water: 'hbh',
  Wind: 'hmc',
  Light: 'hzd',
  Shadow: 'hjp',
};
