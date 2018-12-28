const state = {
  focusSection: null,
  language: "en",
  filters: {
    weaponType: "",
    rarity: "",
    element: "",
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
    weaponType: null,
    fafnir: null,
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