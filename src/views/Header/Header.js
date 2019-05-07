/* eslint-disable no-unused-vars */
import React, { Fragment, memo, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  MenuOutlined,
  HomeOutlined,
  VerticalAlignTopOutlined,
} from '@material-ui/icons';
import { Context, GitHubIcon } from 'components';
import NavDrawer from './NavDrawer';

const Header = memo(() => {
  const { lang } = useContext(Context);
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const [width, setWidth] = useState(window.innerWidth);
  const handleWidth = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, [width]);

  return (
    <div id="header">
      <Fragment>
        <div className="header-icon" onClick={openDrawer}>
          <MenuOutlined />
        </div>

        <div className="header-icon">
          <HomeOutlined />
          <Link to={`/stats/${lang}`}>
            <span className="icon-link" />
          </Link>
        </div>

        <div className="header-icon">
          <img
            alt="donation"
            src={`${process.env.PUBLIC_URL}/images/icon/donation.svg`}
            height="20"
          />
          <Link to={`/donation/${lang}`}>
            <span className="icon-link" />
          </Link>
        </div>
      </Fragment>
      <div style={{ flex: '1' }} />
      {width < 960 ? (
        <div className="header-icon" onClick={scrollToTop}>
          <VerticalAlignTopOutlined />
        </div>
      ) : (
        <div className="header-icon">
          <GitHubIcon />
        </div>
      )}
      <NavDrawer open={open} setOpen={setOpen} />
    </div>
  );
});

export default Header;
