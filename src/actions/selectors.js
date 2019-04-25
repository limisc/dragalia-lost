import locales from 'locales/default';

export const translate = (content, lang = 'en') => {
  if (locales[content]) {
    return locales[content][lang] || locales[content].en;
  }

  return content;
};
