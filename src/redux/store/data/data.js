import LEVEL_LIMIT from './level_data';
import adventurer from './adventurer_data';
import weapon from './weapon_data';
import wyrmprint from './wyrmprint_data';
import dragon from './dragon_data';

const data = {
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
  UIData: {
    IMG_PATH: `${process.env.PUBLIC_URL}/img`,
    filterOptions: {
      type: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
      element: ["Flame", "Water", "Wind", "Light", "Shadow"],
      rarity: ["5", "4", "3"],
      tier: ["3", "2", "1"],
    },
    selectData: {
      adventurer,
      weapon,
      wyrmprint,
      dragon,
    },
    LEVEL_LIMIT,
  }
};

export default data;