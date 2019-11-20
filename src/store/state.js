const OPTIONS = {
  element: ['1', '2', '3', '4', '5'],
  rarity: ['3', '4', '5'],
  weapon: ['1', '2', '3', '4', '5', '6', '7', '8'],
  type: [
    '1020001',
    '1020002',
    '1020003',
    '1010002',
    '1020010',
    '1020011',
    '1010001',
    '1010007',
  ],
};

const createOption = group => {
  return OPTIONS[group].map(value => ({ value, checked: false }));
};

const state = {
  focused: 'wyrmprint',
  options: {
    element: createOption('element'),
    rarity: createOption('rarity'),
    weapon: createOption('weapon'),
    type: createOption('type'),
  },
};

export default state;
