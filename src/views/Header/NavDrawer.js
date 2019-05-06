/* eslint-disable no-unused-vars */
import React, { memo, useContext } from 'react';
import { Drawer } from '@material-ui/core';
import { Context, GitHubIcon } from 'components';

const NavDrawer = memo(({ open, setOpen }) => {
  const { setLang } = useContext(Context);

  const onClick = e => {
    const { lang } = e.target.dataset;
    setLang(lang);
    setOpen(false);
  };

  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={open}
      onClose={() => setOpen(open => !open)}
      classes={{ paper: 'drawer' }}
    >
      <ul>
        <li style={{ position: 'relative' }}>
          <GitHubIcon />
        </li>
        <li data-lang="en" onClick={onClick}>
          English
        </li>
        <li data-lang="ja" onClick={onClick}>
          日本語
        </li>
        <li data-lang="zh" onClick={onClick}>
          简体中文
        </li>
      </ul>
    </Drawer>
  );
});

export default NavDrawer;
