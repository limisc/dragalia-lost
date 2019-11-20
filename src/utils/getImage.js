import getField from './getField';

const getImage = (item, itemKey) => {
  const field = getField(itemKey);

  if (item === null) return `${field}/add`;

  let { image } = item;
  if (field === 'adventurer') {
    const r = item.curRarity || item.rarity;
    image = `${image}_r0${r}`;
  } else if (field === 'wyrmprint') {
    const stage = item.unbind < 2 ? 1 : 2;
    image = `${image}_0${stage}`;
  }

  return `${field}/${image}`;
};

export default getImage;
