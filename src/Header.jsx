import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams, Link } from 'react-router-dom';
import locales from 'locales';
import { Image } from 'components';

function Header() {
  const { lang } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (lang === 'en' || lang === 'ja' || lang === 'zh') return;

    const preferred = /en|ja|zh/.exec(navigator.language);
    const newLang = preferred ? preferred[0] : 'en';

    const path = lang
      ? pathname.replace(lang, newLang)
      : `${pathname}/${newLang}`;

    history.replace(path);
  }, [lang, history, pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <header>
      <div>
        <Image image="icon/stats" />
        <Link to={`/stats/${lang}`} title={locales('stats', lang)}>
          <span />
        </Link>
      </div>

      <div>
        <Image image="icon/home" />
        <Link to={`/facility/${lang}`} title={locales('facility', lang)}>
          <span />
        </Link>
      </div>
    </header>
  );
}

export default Header;
