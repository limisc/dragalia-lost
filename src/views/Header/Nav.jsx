/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';


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
const propTypes = {

};

const defaultProps = {

};


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langOpen: false,
      langOptions: {
        en: "English",
        zh: "简中",
        ja: "日本語",
      }
    };
    this.toggleLang = this.toggleLang.bind(this);
  }


  toggleLang = () => {
    this.setState(state => ({ langOpen: !state.langOpen }));
  };
  render() {
    const {
      navOpen,
      toggleNav,
    } = this.props;

    const {
      langOpen,
    } = this.state;
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
                <ListItem button >
                  <ListItemText inset primary="English" />
                </ListItem>

                <ListItem button >
                  <ListItemText inset primary="简中" />
                </ListItem>

                <ListItem button >
                  <ListItemText inset primary="日本語" />
                </ListItem>
              </List>
            </Collapse>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
          </List>
          <Divider />
        </div>
      </Drawer>
    );
  }
}


Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Nav;