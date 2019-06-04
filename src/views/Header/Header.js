/* eslint-disable no-unused-vars */
import React, { Fragment, memo, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  MenuOutlined,
  HomeOutlined,
  VerticalAlignTop,
  VerticalAlignBottom,
} from '@material-ui/icons';
import { Context, GitHubIcon } from 'components';
import { refs } from 'store';
import { scrollToComponent } from 'actions';
import sizeMe from 'react-sizeme';
import NavDrawer from './NavDrawer';

const Header = memo(({ size: { width } }) => {
  const { lang } = useContext(Context);
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => scrollToComponent(refs.bottom);

  return (
    <div id="header">
      <div className="header-icon" onClick={openDrawer}>
        <MenuOutlined />
      </div>

      <div className="header-icon">
        <HomeOutlined />
        <Link to={`/stats/${lang}`} title="HOME">
          <span className="icon-link" />
        </Link>
      </div>

      <div className="header-icon">
        <img
          alt="donation"
          src={`${process.env.PUBLIC_URL}/images/icon/donation.svg`}
          height="20"
        />
        <Link to={`/donation/${lang}`} title="Donation">
          <span className="icon-link" />
        </Link>
      </div>
      <div className="fill-remains" />

      {width < 960 ? (
        <Fragment>
          {refs.bottom.current && (
            <div className="header-icon" onClick={scrollToBottom}>
              <VerticalAlignBottom />
            </div>
          )}
          <div className="header-icon" onClick={scrollToTop}>
            <VerticalAlignTop />
          </div>
        </Fragment>
      ) : (
        <div className="header-icon">
          <GitHubIcon />
        </div>
      )}
      <NavDrawer open={open} setOpen={setOpen} />
    </div>
  );
});

export default sizeMe()(Header);
