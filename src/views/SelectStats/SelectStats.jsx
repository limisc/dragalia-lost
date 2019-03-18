// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ListHeader from "./ListHeader";
import FilterStats from "./FilterStats";
import StatsList from "./StatsList";

const propTypes = {

};

const defaultProps = {

};


class SelectStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFields: {
        adventurer: ["weapon", "element", "rarity"],
        weapon: ["weapon", "rarity", "tier"],
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
      <Fragment>
        <FilterStats fields={fields} />
        <StatsList fields={fields} />
      </Fragment>
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