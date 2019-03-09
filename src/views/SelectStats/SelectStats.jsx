// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper,
} from '@material-ui/core';

import FilterStats from "./FilterStats";
import StatsTable from "./StatsTable";
const propTypes = {

};

const defaultProps = {

};


class SelectStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFields: {
        adventurer: ["type", "element", "rarity"],
        weapon: ["type", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["element", "rarity"],
      },
    };
  }

  render() {
    const {
      section,
    } = this.props;

    const { [section]: fields } = this.state.filterFields;

    return (
      <Paper className="fluid">
        <FilterStats fields={fields} />
        <StatsTable fields={fields} />
      </Paper>
    );
  }
}


SelectStats.propTypes = propTypes;
SelectStats.defaultProps = defaultProps;

const mapStateToProps = ({ section }) => {
  return {
    section,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //: () => dispatch(),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectStats);