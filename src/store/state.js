const state = {
  language: "en",
  focusSection: "adventurer",
  filters: {
    type: "",
    element: "",
    rarity: "",
    tier: "",
  },
  stats: {
    adventurer: null,
    weapon: null,
    wyrmprint: null,
    dragon: null,
  },
  halidom: {
    element: null,
    weapon: null,
    dragon: null,
  },
  details: {
    adventurer: { HP: 0, STR: 0 },
    weapon: { HP: 0, STR: 0 },
    wyrmprint: { HP: 0, STR: 0 },
    dragon: { HP: 0, STR: 0 },
    ability: { HP: 0, STR: 0 },
    halidom: { HP: 0, STR: 0 },
  }
};

export default state;