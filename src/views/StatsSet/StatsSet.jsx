// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { getMaxLv } from "actions";
import StatsFields from "./StatsFields";


const propTypes = {

};

const defaultProps = {

};


class StatsSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsKeys: ["adventurer", "weapon", "wyrmprint1", "wyrmprint2", "dragon"],
      defaultState: {
        rarity: "5",
        mana: "50",
        ex: "4",
        unbind: "4",
        bond: "30",
      }
    };
  }

  render() {
    const {
      stats,
    } = this.props;

    const {
      statsKeys,
      defaultState,
    } = this.state;

    return (
      <Paper className="fluid sticky">
        {statsKeys.map((statsKey) => {
          const item = stats[statsKey];
          const { Id = statsKey } = item || {};
          // const level
          return (
            <StatsFields
              key={Id}
              item={item}
              statsKey={statsKey}
              defaultState={defaultState}
            />
          );
        })}
      </Paper>
    );
  }
}


StatsSet.propTypes = propTypes;
StatsSet.defaultProps = defaultProps;

const mapStateToProps = ({ stats }) => {
  return {
    stats,
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
)(StatsSet);













/*
import React from 'react';
import { Paper, Grid } from '@material-ui/core';

import StatsAvatar from './StatsAvatar';
import StatsField from './StatsField';
import HalidomStats from './stats/HalidomStats';

const statsKeys = ["adventurer", "weapon", "wyrmprint", "dragon"];

const StatsSet = () => {
  return (
    <Paper className="fluid padding-top">
      {statsKeys.map(statsKey =>
        <Grid container key={statsKey}>
          <Grid item xs={4}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <StatsAvatar
              section={statsKey}
            />
          </Grid>

          <Grid item xs={8}
            container
            spacing={8}
            alignItems="center"
          >
            <StatsField
              section={statsKey}
            />
          </Grid>
        </Grid>
      )}
      <HalidomStats />
    </Paper>
  );
};

export default StatsSet;
*/