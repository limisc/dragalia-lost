import actionTypes from '../actions/actionTypes';
import {
  updateObject,
  createReducer
} from '../actions/actions';


// const updateDetailsCreator = (initState, handlers) => {
//   return (state = initState, action, stats) => {
//     if (handlers.hasOwnProperty(action.section)) {
//       return handlers[action.section](state, stats, action);
//     } else {
//       return state;
//     }
//   }
// }

const getManaBonus = (adventurer, key) => {
  const mana = adventurer.mana.toString();
  const index = ["50", "45", "40", "30", "20", "10", "0"].indexOf(mana);
  const statArray = [
    adventurer["McFullBonus" + key + "5"],
    adventurer["Plus" + key + "4"],
    adventurer["Plus" + key + "3"],
    adventurer["Plus" + key + "2"],
    adventurer["Plus" + key + "1"],
    adventurer["Plus" + key + "0"],
    0,
  ]
  return statArray.slice(index).reduce((acc, cur) => acc + cur);
}

const calcDetail = (section, item, modifier = 1) => {
  const detail = { HP: 0, STR: 0 };
  if (item) {
    let level = parseInt(item.level, 10);
    if (!level || level < 1) level = 1;
    let stats;
    Object.keys(detail).forEach(key => {
      stats = 0;
      if (level === item.MAX_LEVEL) {
        stats = item["Max" + key];
      } else {
        let steps, stepMin, statsMin, statGain;
        if (section === "adventurer") {
          stepMin = "Min" + key + "5";
          statsMin = "Min" + key + item.curRarity;
        } else {
          stepMin = "Min" + key;
          statsMin = stepMin;
        }

        if (level === 1) {
          stats = item[statsMin];
        } else {
          steps = (item["Max" + key] - item[stepMin]) / (item.MAX_LEVEL - 1);
          statGain = (level - 1) * steps;
          stats = item[statsMin] + statGain;
        }
      }
      if (section === "adventurer") stats = stats + getManaBonus(item, key);
      detail[key] = Math.ceil(Math.ceil(stats) * modifier);
    });
  }
  return detail;
}

const updateDetails = (state, action, stats) => {
  const details = {};
  const { adventurer, dragon } = stats;
  ["adventurer", "weapon", "wyrmprint", "dragon"].forEach(section => {
    let modifier = 1;
    if (["weapon", "dragon"].includes(section) && stats[section] && adventurer && stats[section].element === adventurer.element) {
      modifier = 1.5;
    }
    details[section] = calcDetail(section, stats[section], modifier);
  })

  //calc halidom
  const { element, weaponType, statue } = stats.halidom;
  const dragonDetail = calcDetail("dragon", dragon);
  details.halidom = {
    HP: Math.ceil(details.adventurer.HP * (element.HP + weaponType.HP) * 0.01) + Math.ceil(dragonDetail.HP * statue.HP * 0.01),
    STR: Math.ceil(details.adventurer.STR * (element.STR + weaponType.STR) * 0.01) + Math.ceil(dragonDetail.STR * statue.HP * 0.01),
  }


  const subTotal = { HP: 0, STR: 0 };
  Object.keys(details).forEach(field => {
    subTotal.HP += details[field].HP;
    subTotal.STR += details[field].STR;
  })

  //calc ability
  details.ability = { HP: 0, STR: 0 };
  if (adventurer && dragon && adventurer.element === dragon.element) {
    const abilityName = dragon.unbind === 4 ? "Abilities12" : "Abilities11";
    if (dragon[abilityName].field === "HP") {
      details.ability.HP = Math.ceil(subTotal.HP * dragon[abilityName].value * 0.01);
    } else if (dragon[abilityName].field === "STR") {
      details.ability.STR = Math.ceil(subTotal.STR * dragon[abilityName].value * 0.01);
    } else if (dragon[abilityName].field === "BOTH") {
      details.ability.HP = Math.ceil(subTotal.HP * dragon[abilityName].value * 0.01);
      details.ability.STR = Math.ceil(subTotal.STR * dragon[abilityName].value * 0.01);
    }
  }
  return updateObject(state, details);
}

const detailReducer = createReducer({}, {
  [actionTypes.UPDATE_DETAILS]: updateDetails,
})

export default detailReducer;