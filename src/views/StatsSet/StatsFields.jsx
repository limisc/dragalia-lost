// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import { getMaxLV } from "actions";
import StatsAvatar from "./StatsAvatar";


const propTypes = {

};

const defaultProps = {

};


class StatsFields extends Component {
  constructor(props) {
    super(props);

    const { statsKey, item } = props;
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
        level: getMaxLV(statsKey, rarity),
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
      statsKey,
      item,
    } = this.props;
    // console.log(this.state)

    const {
      level,
      rarity,
      mana,
      ex,
      unbind,
      bond,
    } = this.state;
    let image = "add";
    let label = statsKey;

    if (item) {
      label = item.Name["en"];
      switch (statsKey) {
        case "adventurer":
          image = item.Id + rarity;
          break;
        case "wyrmprint1":
        case "wyrmprint2":
          const int_unbind = parseInt(unbind, 10);
          image = int_unbind >= 2 ? item.Id + "2" : item.Id + "1";
          break;
        default:
          image = item.Id;
          break;
      }
    }
    return (
      <Grid container>
        <Grid item xs={4}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <StatsAvatar
            image={image}
            label={label}
            statsKey={statsKey}
          />
        </Grid>

        <Grid item xs={8}
          container
          spacing={8}
          alignItems="center"
        >
          {/* <StatsField
            section={statsKey}
          /> */}
        </Grid>
      </Grid>
    );
  }
}


StatsFields.propTypes = propTypes;
StatsFields.defaultProps = defaultProps;

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
)(StatsFields);