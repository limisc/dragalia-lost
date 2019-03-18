/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from "./Nav";


const propTypes = {

};

const defaultProps = {

};


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }



  toggleNav = () => {
    this.setState(state => ({ navOpen: !state.navOpen }));
  };

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
}


Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;