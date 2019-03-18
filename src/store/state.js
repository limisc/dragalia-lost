const state = {
  focusKey: "weapon",
  filters: {
    weapon: "",
    element: "",
    rarity: "",
    tier: "",
  },
  stats: {
    adventurer: null,
    weapon: null,
    wyrmprint1: null,
    wyrmprint2: null,
    dragon: null,
  },
  halidom: {
    element: null,
    weapon: null,
    dragon: null,
  },
  details: {
    adventurer: {
      HP: 0,
      STR: 0,
      might: 0,
    },
    weapon: {
      HP: 0,
      STR: 0,
      might: 0,
    },
    wyrmprint1: {
      HP: 0,
      STR: 0,
      might: 0,
    },
    wyrmprint2: {
      HP: 0,
      STR: 0,
      might: 0,
    },
    dragon: {
      HP: 0,
      STR: 0,
      might: 0,
    },
  },
};

export default state;