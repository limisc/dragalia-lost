export const LEVEL_LIMIT = {
  mana: { "3": 30, "4": 40, "5": 50 },
  adventurer: { "3": 60, "4": 70, "5": 80 },
  weapon: {//rarity: each unbind level limit,
    "3": [20, 25, 30, 25, 40],
    "4": [50, 55, 60, 65, 70],
    "5": [80, 85, 90, 95, 100]
  },
  wyrmprint: {
    "2": [10, 15, 20, 25, 30],
    "3": [20, 30, 40, 50, 60],
    "4": [30, 40, 50, 65, 80],
    "5": [40, 55, 70, 85, 100],
  },
  dragon: {
    "3": [20, 30, 40, 50, 60],
    "4": [30, 40, 50, 65, 80],
    "5": [40, 55, 70, 85, 100],
  }
};

export const HALIDOM_LIMIT = {
  element: {
    Flame: { HP: 16, STR: 15 },
    Water: { HP: 24.5, STR: 22 },
    Wind: { HP: 24.5, STR: 22 },
    Light: { HP: 24.5, STR: 22 },
    Shadow: { HP: 16, STR: 15 },
  },
  weaponType: {
    Sword: { HP: 23, STR: 23 },
    Blade: { HP: 23, STR: 23 },
    Dagger: { HP: 23, STR: 23 },
    Axe: { HP: 23, STR: 23 },
    Lance: { HP: 23, STR: 23 },
    Bow: { HP: 23, STR: 23 },
    Wand: { HP: 23, STR: 23 },
    Staff: { HP: 23, STR: 23 },
  },
  statue: {
    Flame: { HP: 11.5, STR: 11.5 },
    Water: { HP: 0, STR: 0 },
    Wind: { HP: 11.5, STR: 11.5 },
    Light: { HP: 0, STR: 0 },
    Shadow: { HP: 0, STR: 0 },
  }
};