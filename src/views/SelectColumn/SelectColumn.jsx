// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

import {
  SelectStats,
  SetHalidom,
} from "views";

class SelectColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    const {
      lang,
    } = this.props;

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
        {value === 0 && <SelectStats lang={lang} />}
        {value === 1 && <SetHalidom lang={lang} />}
      </Fragment>
    );
  }

  onChange = (_, value) => {
    this.setState({ value });
  }
}

export default SelectColumn;