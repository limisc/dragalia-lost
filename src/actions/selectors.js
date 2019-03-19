/* eslint-disable no-unused-vars */
import { createSelector } from 'reselect';
import {
  dataLookup,
  limit,
  values,
} from "data";
import intl from "intl/default";
import { statsFields } from "store";


const getSection = (statsKey) => {
  if (statsKey === "wyrmprint1" || statsKey === "wyrmprint2") {
    return "wyrmprint";
  }

  return statsKey;
}

const getLimit = (key, rarity, unbind = 4) => {
  const section = getSection(key);
  switch (section) {
    case "bond":
    case "altar":
    case "dojo":
    case "fafnir":
    case "slime":
    case "event":
      return limit[section];
    case "adventurer":
    case "mana":
      return limit[section][rarity] || 0;
    default:
      const intUnbind = parseInt(unbind, 10) || 0;
      if (limit[section][rarity]) {
        return limit[section][rarity][intUnbind] || 0;
      }

      return 0;
  }
}

const translate = (content, lang = "en") => {
  if (intl[content]) {
    return intl[content][lang] || intl[content]["en"];
  }

  return "";
}


// const getIdList = (props, state) => state.uid[props.section];
// const getData = (props, state) => state.data[props.section];
// const getFilters = (props, state) => {

// }

const getItem = (statsKey, id) => {
  const section = getSection(statsKey);
  if (dataLookup[section]) {
    return dataLookup[section][id];
  }

  return null;
}

const getSearch = (stats) => {
  const searchArray = [];
  statsFields.forEach((k) => {
    if (stats[k]) {
      searchArray.push(`${k}=${stats[k].id}`);
    }
  });

  return `?${searchArray.join("&")}`;
}

const parseSearch = createSelector(
  search => search.slice(1).split("&"),
  (searchArray) => {
    const q = {};
    searchArray.forEach((v) => {
      const a = v.split("=");
      q[a[0]] = getItem(a[0], a[1]);
    });
    return q;
  }
);


const getElement = halidom => halidom.element;
const getWeapon = halidom => halidom.weapon;
const getDragon = halidom => halidom.dragon;


// const getFacilityValue = (type, level) => {
//   if (values[type]) {
//     return values[type][level] || { HP: 0, STR: 0 };
//   }

//   return { HP: 0, STR: 0 };
// }

const getFacilityValue = (facility) => {
  if (facility) {
    const { type, level } = facility;
    return values[type][level] || { HP: 0, STR: 0 };
  }

  return { HP: 0, STR: 0 };
}
const getOverView = field => {
  if (!field) {
    return { HP: 0, STR: 0 };
  }

  let HP = 0, STR = 0;
  field.list.forEach((k) => {
    const value = getFacilityValue(field[k]);
    HP += value.HP;
    STR += value.STR;
  });

  return { HP, STR };
}

const getHalidomOverview = () => {
  return createSelector(
    [getElement, getWeapon, getDragon],
    (element, weapon, dragon) => {
      return {
        element: getOverView(element),
        weapon: getOverView(weapon),
        dragon: getOverView(dragon),
      };
    }
  );
}

export {
  getItem,
  getLimit,
  getHalidomOverview,
  // getFacilityValue,
  getSection,
  getSearch,
  parseSearch,
  translate,
};