import getField from './getField';

const getImage = (item, itemKey) => {
  const field = getField(itemKey);

  if (item === null) return `${field}/blank`;

  let { Image } = item;
  if (field === 'adventurer') {
    const r = item.curRarity || item.Rarity;
    Image = `${Image}_r0${r}`;
  } else if (field === 'wyrmprint') {
    const stage = item.unbind < 2 ? 1 : 2;
    Image = `${Image}_0${stage}`;
  }

  return `${field}/${Image}`;
};

export default getImage;
