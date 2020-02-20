import includes from '../includes';

const calcAdventurer = adventurer => {
  const { mana = '50', Element, Weapon, DefCoef } = adventurer;
  const detail = { Element, Weapon, DefCoef };
  // adventurer.IncSTR = [
  //   { MC: 10, Value: 8 },
  //   { MC: 30, Value: 10 },
  // ];
  ['IncSTR', 'IncDEF'].forEach(key => {
    if (includes(adventurer, key)) {
      const ability = adventurer[key];
      for (let i = 0; i < ability.length; i += 1) {
        if (Number(mana) < ability[i].MC) break;

        detail[key] = ability[i].Value;
      }
    }
  });

  return detail;
};

const calcWeapon = (weapon, sameEle) => {
  const detail = {};
  if (sameEle || weapon.element === null) {
    ['IncSTR', 'IncDEF'].forEach(key => {
      if (includes(weapon, key)) {
        detail[key] = weapon[key];
      }
    });
  }
  return detail;
};

const calcDragon = (dragon, sameEle) => {
  const { Element, unbind = '4' } = dragon;
  const detail = { Element };

  const stage = unbind === '4' ? 1 : 0;

  ['IncHP', 'IncSTR'].forEach(key => {
    if (includes(dragon, key)) {
      const ability = dragon[key];
      for (let i = stage; i < ability.length; i += 2) {
        if (sameEle || ability[i].Element === null) {
          detail[key] = (detail[key] || 0) + ability[i].Value;
        }
      }
    }
  });

  if (includes(dragon, 'IncRES')) {
    detail.ResEle = dragon.IncRES[stage].ResEle;
    detail.IncRES = dragon.IncRES[stage].Value;
  }

  return detail;
};

const calcWyrmprint = wyrmprint => {
  const detail = {};

  const { unbind = '4' } = wyrmprint;
  let isMUB = false;
  let stage = 0;
  if (unbind === '4') {
    stage = 2;
    isMUB = true;
  } else if (unbind >= 2) {
    stage = 1;
  }

  detail.isMUB = isMUB;

  // wyrmprint.IncSTR: [5, 8, 10],
  ['IncHP', 'IncSTR', 'IncDEF'].forEach(key => {
    if (includes(wyrmprint, key)) {
      detail[key] = wyrmprint[key][stage];
    }
  });

  if (includes(wyrmprint, 'IncRES')) {
    detail.ResEle = wyrmprint.ResEle;
    detail.IncRES = wyrmprint.IncRES[stage];
  }

  if (includes(wyrmprint, 'IncDIS')) {
    detail.Enemy = wyrmprint.Enemy;
    detail.IncDIS = wyrmprint.IncDIS[stage];
  }

  return detail;
};

const calcAbility = (itemKey, item, sameEle) => {
  switch (itemKey) {
    case 'adventurer':
      return calcAdventurer(item);
    case 'weapon':
      return calcWeapon(item, sameEle);
    case 'dragon':
      return calcDragon(item, sameEle);
    case 'wyrmprint1':
    case 'wyrmprint2':
      return calcWyrmprint(item);
    default:
      return null;
  }
};

export default calcAbility;
