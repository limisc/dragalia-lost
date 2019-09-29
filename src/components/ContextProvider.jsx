import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadHalidom } from 'actions';

export const Context = React.createContext();

function getWidth() {
  return window.innerWidth;
}

const ContextProvider = ({
  children,
  history,
  match: { params, path },
  // eslint-disable-next-line no-shadow
  loadHalidom,
}) => {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWidth());
    };

    loadHalidom();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loadHalidom]);

  const [lang, setLang] = useState(() => {
    const pattern = /en|ja|zh/;
    if (pattern.test(params.lang)) {
      return params.lang;
    }

    const preferred = pattern.exec(navigator.language);
    return preferred ? preferred[0] : 'en';
  });

  useEffect(() => {
    if (params.lang !== lang) {
      history.replace(path.replace(':lang?', lang));
    }
  }, [lang, history, params.lang, path]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const value = React.useMemo(() => ({ lang, setLang, width }), [lang, width]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const actionCreators = { loadHalidom };

export default connect(
  null,
  actionCreators
)(ContextProvider);
