/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from '@material-ui/core';
import {
  MenuOutlined,
  HomeOutlined,
  VerticalAlignTop,
  VerticalAlignBottom,
} from '@material-ui/icons';
import { refs, scrollTo, translate } from 'utils';
import { md } from 'styles/styles.scss';
import { Context } from './ContextProvider';

/*
<div>
  <img
    alt="donation"
    src={`${process.env.PUBLIC_URL}/images/icon/donation.svg`}
    height="20"
  />
  <Link to={`/donation/${lang}`} title="Donation">
    <span />
  </Link>
</div>
*/

const GitHubIcon = memo(() => {
  return (
    <>
      <img
        alt="github"
        src={`${process.env.PUBLIC_URL}/images/icon/github.png`}
      />

      <a
        href="https://github.com/junlico/dragalia-lost"
        title="GitHub Repository"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span />
      </a>
    </>
  );
});

const NavDrawer = memo(({ lang, open, setOpen }) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer classes={{ paper: 'drawer' }} open={open} onClose={onClose}>
      <ul>
        <li>
          <GitHubIcon />
        </li>
        <li>
          <Link to={`/halidom/${lang}`} onClick={onClose}>
            <span>{translate('halidom', lang)}</span>
          </Link>
        </li>

        <li>
          <Link to={`/facility/${lang}`} onClick={onClose}>
            <span>{translate('facility', lang)}</span>
          </Link>
        </li>
      </ul>
    </Drawer>
  );
});

function Header() {
  const { lang, width } = React.useContext(Context);
  const [open, setOpen] = useState(false);

  const desktop = React.useMemo(() => width >= parseInt(md, 10), [width]);

  const onClick = () => {
    setOpen(true);
  };

  const scrollDown = () => {
    scrollTo(refs.col3);
  };

  const scrollTop = () => {
    scrollTo(0);
  };

  return (
    <header>
      <div role="button" tabIndex="0" onClick={onClick}>
        <MenuOutlined />
      </div>

      <div>
        <HomeOutlined />
        <Link to={`/stats/${lang}`} title="HOME">
          <span />
        </Link>
      </div>

      {desktop ? (
        <div>
          <GitHubIcon />
        </div>
      ) : (
        <>
          <div>
            <VerticalAlignBottom onClick={scrollDown} />
          </div>
          <div>
            <VerticalAlignTop onClick={scrollTop} />
          </div>
        </>
      )}

      <NavDrawer lang={lang} open={open} setOpen={setOpen} />
    </header>
  );
}

export default memo(Header);
