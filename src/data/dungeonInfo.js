export const dungeonInfo = {
  hms: {
    element: 'Wind',
    // [str, multiplier]
    N: [3253, 2.3],
    H: [7230, 3.6],
    VH: [9000, 3.7],
    EX: [13000, 3.4],
  },
  hbh: {
    element: 'Flame',
    N: [3253, 2],
    H: [7230, 4.8],
    VH: [9000, 4.75],
    EX: [13000, 3.5],
  },
  hmc: {
    element: 'Water',
    N: [7230, 1.1],
    H: [7230, 2.75],
    VH: [9000, 3.2],
    EX: [13000, 3.1],
  },
  hjp: {
    element: 'Light',
    N: [7230, 0.7],
    H: [7230, 4.4],
    VH: [9000, 4.2],
    EX: [13000, 4.6],
  },
  hzd: {
    element: 'Shadow',
    N: [7996, 0.7],
    H: [7996, 4.4],
    VH: [8386, 4.4],
    EX: [9000, 4],
  },
};

export const advantagedDungeon = {
  Flame: 'hms',
  Water: 'hbh',
  Wind: 'hmc',
  Light: 'hzd',
  Shadow: 'hjp',
};
