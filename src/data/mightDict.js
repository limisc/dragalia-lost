const mightDict = {
  adventurerSkill: {
    '50': 500, //300+200,
    '45': 500, //300+200,
    '40': 400, //200+200,
    '30': 300, //200+100,
    '20': 200, //100+100,
    '10': 100,
    '0': 100,
  },
  itemSkill: {
    '4': 100,
    '0': 50,
  },
  adventurerAbility: {
    '5': {
      '50': ['abilities12', 'abilities22', 'abilities32'],
      '45': ['abilities12', 'abilities22', 'abilities32'],
      '40': ['abilities12', 'abilities22', 'abilities31'],
      '30': ['abilities12', 'abilities21', 'abilities31'],
      '20': ['abilities11', 'abilities21', 'abilities31'],
      '10': ['abilities11', 'abilities21'],
      '0': [],
    },
    res: {
      '50': ['abilities12', 'abilities22', 'abilities31'],
      '45': ['abilities12', 'abilities22', 'abilities31'],
      '40': ['abilities12', 'abilities22'],
      '30': ['abilities12', 'abilities21'],
      '20': ['abilities11', 'abilities21'],
      '10': ['abilities11', 'abilities21'],
      '0': [],
    },
  },
  fs: {
    '40': 120,
    '10': 60,
  },
  ex: {
    '5': {
      '0': 170,
      '1': 200,
      '2': 230,
      '3': 260,
      '4': 320,
    },
    '4': {
      '0': 110,
      '1': 140,
      '2': 170,
      '3': 230,
      '4': 320,
    },
    '3': {
      '0': 50,
      '1': 110,
      '2': 170,
      '3': 230,
      '4': 320,
    },
  },
};

export default mightDict;
