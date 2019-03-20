
import React, { Component, Fragment } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from "./Nav";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
    };
  }

  render() {
    const title = "Dragalia Lost - Stats Calculator";
    const {
      navOpen,
    } = this.state;

    return (
      <Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.toggleNav}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Nav
          navOpen={navOpen}
          toggleNav={this.toggleNav}
        />
      </Fragment>
    );
  }

  toggleNav = () => {
    this.setState(state => ({ navOpen: !state.navOpen }));
  };

}

export default Header;