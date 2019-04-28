/* eslint-disable no-unused-vars */
import React from 'react';
import { withTheme } from 'components';
import { Drawer } from '@material-ui/core';

class NavDrawer extends React.PureComponent {
  render() {
    const { open, toggleDrawer } = this.props;
    return (
      <Drawer
        anchor="left"
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        classes={{ paper: 'drawer' }}
      >
        <ul>
          <li data-lang="en" onClick={this.onClick}>
            English
          </li>
          <li data-lang="ja" onClick={this.onClick}>
            日本語
          </li>
          <li data-lang="zh" onClick={this.onClick}>
            简体中文
          </li>
        </ul>
      </Drawer>
    );
  }

  onClick = e => {
    const { lang } = e.target.dataset;
    if (lang !== this.props.lang) {
      this.props.setLang(lang);
    }
    this.props.toggleDrawer();
  };
}

export default withTheme(NavDrawer);
