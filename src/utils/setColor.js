const validNumber = num => {
  if (num < 5) return 5;
  if (num > 250) return 250;
  return num;
};

export const setColor = color => {
  let hex = String(color).replace(/[^0-9a-f]/gi, '');

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) return null;

  const family = Array(5).fill('#');
  const s = 2;
  for (let i = 0; i < 3; i += 1) {
    let c = parseInt(hex.substr(i * 2, 2), 16);
    c = validNumber(c);

    for (let j = -s; j < 3; j += 1) {
      let variant = Math.round(((250 - c) / 4) * j + c);
      variant = validNumber(variant);
      variant = variant.toString(16);
      family[j + s] += `00${variant}`.substr(variant.length);
    }
  }

  return family;
};

export const getBGCStyleProp = backgroundColor => ({ backgroundColor });

export const getBodyBGC = theme => theme[1];
export const getInputBGC = theme => getBGCStyleProp(theme[0]);
export const getPaperBGC = theme => getBGCStyleProp(theme[2]);
export const getOutBGC = theme => getBGCStyleProp(theme[4]);
