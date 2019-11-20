const getField = key => {
  if (key === 'wyrmprint1' || key === 'wyrmprint2') {
    return 'wyrmprint';
  }

  return key;
};

export default getField;
