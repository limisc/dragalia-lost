import actionTypes from '../actions/actionTypes';
import { updateObject, createReducer } from '../actions/actions';


const updateDetailsCreator = (initState, handlers) => {
  return (state = initState, action, stats) => {
    if (handlers.hasOwnProperty(action.section)) {
      return handlers[action.section](state, stats);
    } else {
      return state;
    }
  }
}

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

const calcDetails = (section, item, modifier = 1) => {
  const details = { HP: 0, STR: 0 };
  if (item) {
    let level = parseInt(item.level, 10);
    if (!level || level < 1) level = 1;
    let stats, steps, statGain;

    Object.keys(details).forEach(key => {
      stats = 0;
      if (level === item.MAX_LEVEL) {
        stats = item["Max" + key];
      } else if (section === "adventurer") {
        steps = (item["Max" + key] - item["Min" + key + "5"]) / (item.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = item["Min" + key + item.curRarity] + statGain;
      } else {
        steps = (item["Max" + key] - item["Min" + key]) / (item.MAX_LEVEL - 1);
        statGain = (level - 1) * steps;
        stats = item["Min" + key] + statGain;
      }

      if (section === "adventurer") stats = stats + getManaBonus(item, key);

      details[key] = Math.ceil(Math.ceil(stats) * modifier);
    });
  }
  return details;
}


const getWeaponDragon = (section, stats) => {
  let modifier = 1;
  if (stats.adventurer && stats.adventurer.element === stats[section].element) modifier = 1.5;
  return calcDetails([section], stats[section], modifier);
}

const getHalidom = (state, stats) => {
  //changes when adventurer, dragon, and halidom changes.
  const detail = { HP: 0, STR: 0 };
  const { halidom: { element, weaponType, statue }, adventurer, dragon } = stats;
  const adventurer_HP_percent = element.HP + weaponType.HP;
  const adventurer_STR_percent = element.STR + weaponType.STR;
  if (adventurer) {
    detail.HP = Math.ceil(adventurer.HP * (element.HP + weaponType.HP) * 0.01);
    detail.STR = Math.ceil(adventurer.STR * (element.STR + weaponType.STR) * 0.01);
  }

  if (dragon) {
  }
}


const updateDetailsAdventurer = (state, stats) => {
  const adventurer = calcDetails("adventurer", stats.adventurer);

  return updateObject(state, { adventurer });
}

const updateDetailsWeapon = (state, stats) => {
  let modifier = 1;
  if (stats.adventurer && stats.adventurer.element === stats.weapon.element) modifier = 1.5;
  const weapon = calcDetails("weapon", stats.weapon, modifier);
  return updateObject(state, { weapon });
}

const updateDetailsWyrmprint = (state, stats) => {
  const wyrmprint = calcDetails("wyrmprint", stats.wyrmprint);
  return updateObject(state, { wyrmprint });
}

// const updateDetailsHalidom =



const updateDetails = updateDetailsCreator({}, {
  adventurer: updateDetailsAdventurer,
  weapon: updateDetailsWeapon,
  wyrmprint: updateDetailsWyrmprint,
})

const detailReducer = createReducer({}, {
  [actionTypes.UPDATE_DETAILS]: updateDetails,
})

export default detailReducer;