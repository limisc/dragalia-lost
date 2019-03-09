import { createSelector } from 'reselect';
import { limit } from "data";
import intl from "intl/default";

const getSection = (statsKey) => {
  if (statsKey === "wyrmprint1" || statsKey === "wyrmprint2") {
    return "wyrmprint";
  }

  return statsKey;
}

const getLimit = (statsKey, rarity, unbind = 4) => {
  const section = getSection(statsKey);
  if (section === "adventurer" || section === "mana") {
    if (limit[section][rarity]) {
      return limit[section][rarity];
    }

    return "";
  } else {
    const int_unbind = parseInt(unbind, 10);
    if (limit[section][rarity][int_unbind]) {
      return limit[section][rarity][int_unbind];
    }

    return "";
  }
}

const translate = (content, lang = "en") => {
  if (content) {
    if (intl[content]) {
      return !!intl[content][lang]
        ? intl[content][lang]
        : intl[content]["en"];
    }
  }

  return "";
}


const getIdList = (props, state) => state.uid[props.section];
const getData = (props, state) => state.data[props.section];
const getFilters = (props, state) => {

}

// const buildOptions = createSelector(
//   options => options,
//   (_, lang = "en") => lang,
//   (options, lang) => {
//     if (Array.isArray(options) && (typeof options[0] === "string" || options[0] instanceof String)) {
//       return options.map(option => {
//         let label = option;
//         if (option === "") {
//           label = "All";
//         } else if (isNaN(option)) {
//           label = translate(option, lang);
//         }
//         return <MenuItem key={option} value={option}>{label}</MenuItem>;
//       });
//     } else {
//       return undefined;
//     }


export {
  getLimit,
  getSection,
  translate,
};