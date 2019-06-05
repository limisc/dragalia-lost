/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Context from './Context';

const ThemeProvider = ({
  children,
  history,
  location: { pathname },
  match: { params, path },
}) => {
  const [lang, setLang] = useState(() => {
    // only runs when construct
    const supports = lang => /en|ja|zh/.exec(lang);

    if (supports(params.lang)) {
      return params.lang;
    } else {
      const preferred = supports(navigator.language);
      return preferred ? preferred[0] : 'en';
    }
  });

  useEffect(() => {
    if (lang !== params.lang) {
      history.replace(path.replace(':lang?', lang));
      const title = {
        en: 'Dragalia Lost - Stats Calculator',
        ja: 'ドラガリアロスト',
        zh: '失落的龙约 - 人物属性计算器',
      };
      document.title = title[lang];
    }
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const value = { lang, setLang };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default withRouter(ThemeProvider);
