// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { Context } from "store";
import {
  adventurer,
  weapon,
  wyrmprint,
  dragon,
} from "data";
import { getSection } from "actions";
import StatsField from "./StatsField";

const propTypes = {

};

const defaultProps = {

};


class SetStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsFields: ["adventurer", "weapon", "wyrmprint1", "wyrmprint2", "dragon"],
      adventurer,
      weapon,
      wyrmprint,
      dragon,
    };
    console.log("once")
  }

  render() {

    const {
      statsFields,
    } = this.state;

    return (
      <Paper className="fluid sticky">
        {statsFields.map((statsKey) => {
          const section = getSection(statsKey);
          const { [statsKey]: uid } = this.context.stats;
          const { [section]: { [uid]: item } } = this.state;
          const key = item ? uid : statsKey;
          return (
            <StatsField
              key={key}
              uid={uid}
              item={item}
              statsKey={statsKey}
            />
          );
        })}
      </Paper>
    );
  }
}

SetStats.contextType = Context;
SetStats.propTypes = propTypes;
SetStats.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {

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
)(SetStats);