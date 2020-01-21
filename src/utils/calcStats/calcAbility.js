import includes from '../includes';

const calcAdventurer = adventurer => {
  const { mana = '50', element, weapon, defCoef } = adventurer;
  const detail = { element, weapon, defCoef };
  // adventurer.incSTR = [
  //   { mc: 30, value: 10 },
  //   { mc: 10, value: 8 },
  // ];
  ['incSTR', 'incDEF'].forEach(key => {
    if (includes(adventurer, key)) {
      const ability = adventurer[key].find(el => mana >= el.mc);

      if (ability) {
        const { value } = ability;
        detail[key] = value;
      }
    }
  });

  return detail;
};

const calcWeapon = (weapon, sameEle) => {
  const detail = {};
  if (sameEle || weapon.element === '0') {
    ['incSTR', 'incDEF'].forEach(key => {
      if (includes(weapon, key)) {
        detail[key] = weapon[key];
      }
    });
  }
  return detail;
};

const calcDragon = (dragon, sameEle) => {
  const { element, unbind = '4' } = dragon;
  const detail = { element };

  const stage = unbind === '4' ? 0 : 1;
  if (sameEle || dragon.Id === '20050310') {
    ['incHP', 'incSTR'].forEach(key => {
      if (includes(dragon, key)) {
        detail[key] = dragon[key][stage];
      }
    });
  }

  if (includes(dragon, 'incRES')) {
    detail.resEle = dragon.resEle;
    detail.incRES = dragon.incRES[stage];
  }

  return detail;
};

const calcWyrmprint = wyrmprint => {
  const detail = {};

  const { unbind = '4' } = wyrmprint;
  let isMUB = false;
  let stage = 2;
  if (unbind === '4') {
    stage = 0;
    isMUB = true;
  } else if (unbind >= 2) {
    stage = 1;
  }

  detail.isMUB = isMUB;

  // wyrmprint.incSTR: [10, 8, 5],
  ['incHP', 'incSTR', 'incDEF'].forEach(key => {
    if (includes(wyrmprint, key)) {
      detail[key] = wyrmprint[key][stage];
    }
  });

  if (includes(wyrmprint, 'incRES')) {
    detail.resEle = wyrmprint.resEle;
    detail.incRES = wyrmprint.incRES[stage];
  }

  if (includes(wyrmprint, 'incDIS')) {
    detail.enemy = wyrmprint.enemy;
    detail.incDIS = wyrmprint.incDIS[stage];
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
