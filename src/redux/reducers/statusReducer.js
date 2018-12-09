const updateObject = (oldObject, ...newValues) => {
  return Object.assign({}, oldObject, ...newValues);
}

const state = {
  selectedSection: null,
  filters: {
    type: "",
    rarity: "",
    element: "",
    tier: "",
  },
  settings: {
    adventurer: { helo: 1 },
    weapon: null,
    wyrmprint: null,
    dragon: null,
    facility: null,
  },
  stats: {
    adventurer: { HP: 0, STR: 0 },
    weapon: { HP: 0, STR: 0 },
    wyrmprint: { HP: 0, STR: 0 },
    dragon: { HP: 0, STR: 0 },
    ability: { HP: 0, STR: 0 },
    facility: { HP: 0, STR: 0 },
  }
};

const calcStats = (section, status, key, modifier) => {
  let stats = 0;
  if (status) {
    let level = parseInt(status.level, 10);
    if (!level || level < 1) level = 1;
    let steps, statGain;
    switch (section) {
      case "adventurer": {
        steps = (status["Max" + key] - status["Min" + key + "5"]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = status["Min" + key + status.curRarity] + statGain + this.getManaBonus(status, key);
        break;
      }
      case "weapon":
      case "wyrmprint":
      case "dragon":
        steps = (status["Max" + key] - status["Min" + key]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = Math.ceil(status["Min" + key] + statGain) * modifier;
        break;
      default:
        break;
    }
    stats = Math.ceil(stats)
  }
  return stats;
}

const hero = {
  "Id": "100001_01",
  "Name": "Euden",
  "type": "Sword",
  "rarity": "4",
  "element": "Flame",
  "MinHP3": 40,
  "MinHP4": 58,
  "MinHP5": 66,
  "MaxHP": 415,
  "PlusHP0": 48,
  "PlusHP1": 56,
  "PlusHP2": 66,
  "PlusHP3": 56,
  "PlusHP4": 28,
  "McFullBonusHP5": 24,
  "MinSTR3": 27,
  "MinSTR4": 38,
  "MinSTR5": 44,
  "MaxSTR": 278,
  "PlusSTR0": 32,
  "PlusSTR1": 37,
  "PlusSTR2": 44,
  "PlusSTR3": 37,
  "PlusSTR4": 18,
  "McFullBonusSTR5": 18,
  "MAX_LEVEL": 80
}

const statusReducer = (state = state, action) => {
  const { section } = action;
  switch (action.type) {
    case "SELECT_STATUS": {
    }

    default: return state;
  }
}
