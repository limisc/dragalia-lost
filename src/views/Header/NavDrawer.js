/* eslint-disable no-unused-vars */
import React, { memo, useContext } from 'react';
import { Drawer } from '@material-ui/core';
import { Context, GitHubIcon } from 'components';
import { translate } from 'actions';
import { history } from 'store';

const NavDrawer = memo(({ open, setOpen }) => {
  const { lang, setLang } = useContext(Context);

  const changeLang = lang => () => {
    setLang(lang);
    setOpen(false);
  };

  const toPage = page => () => history.push(`/${page}/${lang}`);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      classes={{ paper: 'drawer' }}
    >
      <ul>
        <li style={{ position: 'relative' }}>
          <GitHubIcon />
        </li>
        <li onClick={toPage('facility')}>{translate('facility', lang)}</li>
        <li onClick={changeLang('en')}>English</li>
        <li onClick={changeLang('ja')}>日本語</li>
        <li onClick={changeLang('zh')}>简体中文</li>
      </ul>
    </Drawer>
  );
});

export default NavDrawer;
