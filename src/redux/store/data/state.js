const state = {
  focusSection: null,
  // language: "en",
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
    halidom: {
      elementType: { HP: 0, STR: 0 },
      weaponType: { HP: 0, STR: 0 },
      dragon: { HP: 0, STR: 0 },
    }
  },
  // details: {
  //   adventurer: { HP: 0, STR: 0 },
  //   weapon: { HP: 0, STR: 0 },
  //   wyrmprint: { HP: 0, STR: 0 },
  //   dragon: { HP: 0, STR: 0 },
  //   ability: { HP: 0, STR: 0 },
  //   facility: { HP: 0, STR: 0 },
  //   total: { HP: 0, STR: 0 },
  // }
};

export default state;