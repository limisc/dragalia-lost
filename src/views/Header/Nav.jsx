
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Language from '@material-ui/icons/Language';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { translate } from "actions";
import LangItem from "./LangItem";
import PageItem from "./PageItem";

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

export default withRouter(Nav);