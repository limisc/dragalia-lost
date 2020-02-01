import { includes } from 'utils';
import halidom from './halidom';
import ui from './ui';

const dataSet = {
  halidom,
  ui,
};

const locales = (text, lang = 'en', field = 'ui') => {
  if (includes(dataSet[field], text)) {
    const {
      [text]: { [lang]: label, en },
    } = dataSet[field];

    return label || en;
  }

  return text;
};

export default locales;
