// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';
import { history } from "store";

class LangItem extends React.PureComponent {

  render() {
    const {
      label,
    } = this.props;

    return (
      <ListItem button onClick={this.onClick}>
        <ListItemText inset primary={label} />
      </ListItem>
    );
  }

  onClick = () => {
    const {
      lang,
      location: {
        search,
      },
      match: {
        params,
      },
      navClose,
    } = this.props;

    if (lang !== params.lang) {
      history.push({
        pathname: `/${params.page}/${lang}`,
        search,
      });
    }
    navClose();
  }
}

export default withRouter(LangItem);