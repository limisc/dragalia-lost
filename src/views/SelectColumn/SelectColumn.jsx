// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Tabs,
  Tab,
} from '@material-ui/core';
import {
  translate,
  selectCol,
} from "actions";
import {
  SelectStats,
  SetHalidom,
} from "views";

class SelectColumn extends Component {
  render() {
    const {
      col,
      lang,
    } = this.props;

    const stats = translate("stats", lang);
    const facility = translate("facility", lang);
    return (
      <Fragment>
        <Tabs
          value={col}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={this.onChange}
        >
          <Tab label={stats} />
          <Tab label={facility} />
        </Tabs>
        {col === 0 && <SelectStats lang={lang} />}
        {col === 1 && <SetHalidom lang={lang} />}
      </Fragment>
    );
  }

  onChange = (_, value) => {
    this.props.selectCol(value);
  }
}

const mapStateToProps = ({ col }) => {
  return {
    col,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCol: (col) => dispatch(selectCol(col)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectColumn);