const data = {
  showDetails: true,
  selectedSection: null,
  filters: {
    type: "",
    rarity: "",
    element: "",
    tier: "",
  },
  statusSets: {
    adventurer: null,
    weapon: null,
    wyrmprint: null,
    dragon: null,
    facility: {
      typeList: ["altar", "dojo"],
      type: "", //WeaponType, not typeList which is facilityType above.
      element: "",
      altar: {
        contentList: ["altar1", "altar2"],
        altar1: 30,
        altar2: 30,
      },
      dojo: {
        contentList: ["dojo1", "dojo2"],
        dojo1: 30,
        dojo2: 30,
      }
    },
  },
  stats: {
    adventurer: { HP: 0, STR: 0 },
    weapon: { HP: 0, STR: 0 },
    wyrmprint: { HP: 0, STR: 0 },
    dragon: { HP: 0, STR: 0 },
    ability: { HP: 0, STR: 0 },
    facility: { HP: 0, STR: 0 },
    total: { HP: 0, STR: 0 },
  }
};

export default data;