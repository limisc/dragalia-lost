// @flow

import React from 'react';
import { withRouter } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';
import { history } from "store";

class PageItem extends React.PureComponent {
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
      page,
      navClose,
      location: { search },
      match: { params },
    } = this.props;

    if (page !== params.page) {
      history.push({
        pathname: `/${page}/${params.lang}`,
        search,
      });
    }
    navClose();
  }
}

export default withRouter(PageItem);