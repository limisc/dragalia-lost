import React from 'react';
import { createSelector } from 'reselect';
import { MenuItem } from '@material-ui/core';
import intl from "intl";
export const translate = (content, lang = "en", field) => {
  if (content) {
    if (field) {
      return "";
    } else if (intl[content]) {
      return intl[content][lang] ? intl[content][lang] : intl[content]["en"];
    }
    return content;
  }
  return "";
}

export const getSection = (statsKey) => {
  if (statsKey === "wyrmprint1" || statsKey === "wyrmprint2") {
    return "wyrmprint";
  } else {
    return statsKey;
  }
}

// export const getMaxLV = (statsKey, rarity, unbind = 4) => {
//   const section = getSection(statsKey);
//   unbind = parseInt(unbind, 10);
//   if (limit[section][rarity]) {
//     const temp = limit[section][rarity];
//     if (section === "mana" || section === "adventurer") {
//       return temp;
//     } else if (temp[unbind]) {
//       return temp[unbind];
//     }
//   }
//   return 0;
// }

export const getTitle = (lang = "en", mode = "stats") => {
  return {
    en: {
      stats: "Dragalia Lost - Stats Calculator",
      dungeon: "Dragalia Lost-Dungeon Simulator",
    },
    zh: {
      stats: "失落的龙约 - 属性计算器",
      dungeon: "失落的龙约 - 副本模拟",
    },
    ja: {
      stats: "ドラガリアロスト - Stats Calculator",
      dungeon: "ドラガリアロスト - Dungeon Simulator",
    }
  }[lang][mode];
}

export const buildOptions = createSelector(
  options => options,
  (_, lang = "en") => lang,
  (options, lang) => {
    if (Array.isArray(options) && (typeof options[0] === "string" || options[0] instanceof String)) {
      return options.map(option => {
        let label = option;
        if (option === "") {
          label = "All";
        } else if (isNaN(option)) {
          label = translate(option, lang);
        }
        return <MenuItem key={option} value={option}>{label}</MenuItem>;
      });
    } else {
      return undefined;
    }
  }
);