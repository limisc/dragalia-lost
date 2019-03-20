/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  AppBar,
  CssBaseline,
  Collapse,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Language from '@material-ui/icons/Language';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import {
  Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import { translate } from "actions";
import LangItem from "./LangItem";
import PageItem from "./PageItem";
const propTypes = {

};

const defaultProps = {

};


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langOpen: true,
    };
  }

  render() {
    const {
      navOpen,
      toggleNav,
      match: {
        params: { lang = "en" },
      }
    } = this.props;

    const {
      langOpen,
    } = this.state;

    const statsLabel = translate("stats", lang);
    const dungeonLabel = translate("dungeon", lang);
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={navOpen}
        onClose={toggleNav}
        classes={{
          paper: "drawerWidth",
        }}
      >
        <div className="content">
          <Divider />
          <List>
            <ListItem button onClick={this.toggleLang}>
              <ListItemIcon>
                <Language />
              </ListItemIcon>
              <ListItemText primary="Language" />
              {langOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={langOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <LangItem
                  lang="en"
                  label="English"
                  navClose={toggleNav}
                />
                <LangItem
                  lang="zh"
                  label="简中"
                  navClose={toggleNav}
                />
                <LangItem
                  lang="ja"
                  label="日本語"
                  navClose={toggleNav}
                />
              </List>
            </Collapse>
            <Divider />
            <PageItem
              page="stats"
              label={statsLabel}
              navClose={toggleNav}
            />
            <PageItem
              page="dungeon"
              label={dungeonLabel}
              navClose={toggleNav}
            />
          </List>

        </div>
      </Drawer>
    );
  }

  toggleLang = () => {
    this.setState(state => ({ langOpen: !state.langOpen }));
  };
}


Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default withRouter(Nav);