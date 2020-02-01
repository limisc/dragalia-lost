const calcVal = value => {
  const tolerance = 0.00001;
  const round = Math.round(value);
  if (Math.abs(value - round) < tolerance) {
    return round;
  }

  return Math.ceil(value);
};

export default calcVal;
