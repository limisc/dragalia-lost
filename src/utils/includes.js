const includes = (obj, key) => {
  if (obj == null) return false;

  return Object.prototype.hasOwnProperty.call(obj, key);
};

export default includes;
