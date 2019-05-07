/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import Context from './Context';

const ThemeProvider = ({ children, history, match: { params, path } }) => {
  const [lang, setLang] = useState(params.lang);

  const getPreferred = () => {
    const langExec = /en|ja|zh/.exec(navigator.language);
    return langExec ? langExec[0] : 'en';
  };

  const preferred = useMemo(getPreferred, [getPreferred]);

  useEffect(() => {
    const replaceURL = lang => {
      const url = path.replace(':lang?', lang);
      history.replace(url);
    };

    const setTitle = lang => {
      const title = {
        en: 'Dragalia Lost - Stats Calculator',
        ja: 'ドラガリアロスト',
        zh: '失落的龙约 - 人物属性计算器',
      };
      document.title = title[lang] || title.en;
    };

    if (lang !== params.lang) {
      window.scrollTo(0, 0);
      setTitle(lang);
      replaceURL(lang);
    } else if (!lang || ['en', 'ja', 'zh'].indexOf(lang) === -1) {
      setTitle(preferred);
      setLang(preferred);
      replaceURL(preferred);
    }
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const value = { lang, setLang };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default withRouter(ThemeProvider);
