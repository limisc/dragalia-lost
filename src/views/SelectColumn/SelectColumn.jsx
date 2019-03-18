// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

import {
  SelectStats,
  SetHalidom,
} from "views";
const propTypes = {

};

const defaultProps = {

};


class SelectColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  render() {
    const {
      value,
    } = this.state;
    return (
      <Fragment>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={this.onChange}
        >
          <Tab label="stats list" />
          <Tab label="halidom list" />
        </Tabs>
        {value === 0 && <SelectStats />}
        {value === 1 && <SetHalidom />}
      </Fragment>
    );
  }

  onChange = (_, value) => {
    this.setState({ value });
  }
}


SelectColumn.propTypes = propTypes;
SelectColumn.defaultProps = defaultProps;

export default SelectColumn;