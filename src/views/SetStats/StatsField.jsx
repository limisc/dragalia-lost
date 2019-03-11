// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import {
  getLimit,
  getSection,
} from "actions";

import StatsAvatar from "./StatsAvatar";

const propTypes = {

};

const defaultProps = {

};


class StatsField extends Component {
  constructor(props) {
    super(props);
    const { item, statsKey } = props;
    let state = {
      level: "",
      rarity: "",
      mana: "",
      ex: "",
      unbind: "",
      bond: "",
    }
    if (item) {
      const rarity = statsKey === "adventurer" ? "5" : item.rarity;
      state = {
        level: getLimit(statsKey, rarity),
        rarity,
        mana: "50",
        ex: "4",
        unbind: "4",
        bond: "30",
      }
    }
    this.state = state;
  }

  render() {
    const {
      uid,
      item,
      statsKey,
    } = this.props;

    const {
      level,
      rarity,
      mana,
      ex,
      unbind,
      bond,
    } = this.state;
    const { Name } = item || {};

    let image = uid;
    if (!!uid) {
      switch (statsKey) {
        case "adventurer":
          image = uid + rarity;
          break;
        case "wyrmprint1":
        case "wyrmprint2":
          const int_unbind = parseInt(unbind, 10);
          image = int_unbind >= 2 ? uid + "2" : uid + "1";
          break;
        default:
          image = uid;
          break;
      }
    }
    return (
      <Grid container style={{ height: "120px" }}>
        <Grid
          container
          item xs={4}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <StatsAvatar
            image={image}
            name={Name}
            statsKey={statsKey}
          />
        </Grid>

        <Grid
          container
          item xs={8}
          spacing={8}
          alignItems="center"
        >
        </Grid>
      </Grid>
    );
  }
}


StatsField.propTypes = propTypes;
StatsField.defaultProps = defaultProps;

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
)(StatsField);