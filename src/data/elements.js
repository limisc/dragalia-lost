const elements = {
  Flame: {
    advantage: 'Wind',
    disAdvantage: 'Water',
  },
  Water: {
    advantage: 'Flame',
    disAdvantage: 'Wind',
  },
  Wind: {
    advantage: 'Water',
    disAdvantage: 'Flame',
  },
  Light: {
    advantage: 'Shadow',
    disAdvantage: 'Shadow',
  },
  Shadow: {
    advantage: 'Light',
    disAdvantage: 'Light',
  },
};

export default elements;
