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
};

export default data;