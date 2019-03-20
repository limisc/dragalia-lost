
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  translate,
  reset,
} from "actions";
import { history } from "store";
import MenuIcon from '@material-ui/icons/Menu';
import Nav from "./Nav";

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
    };
  }

  render() {
    const {
      lang,
    } = this.props;
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
              className="title"
            >
              {title}
            </Typography>
            <Button
              color="inherit"
              onClick={this.onClick}
            >
              {translate("reset", lang)}
            </Button>
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

  onClick = () => {
    const {
      reset,
      location: { pathname },
    } = this.props;
    reset();
    history.push(pathname);
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(reset()),
  };
}

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(Header));