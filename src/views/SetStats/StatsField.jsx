// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import {
  getLimit,
  updateDetails,
} from "actions";

import StatsAvatar from "./StatsAvatar";
import InputNumber from "./InputNumber";
import SelectItem from './SelectItem';

const propTypes = {

};

const defaultProps = {

};


class StatsField extends Component {
  constructor(props) {
    super(props);
    const { item, statsKey, updateDetails } = props;
    let state = null;
    if (item) {
      const rarity = statsKey === "adventurer" ? "5" : item.rarity;
      state = {
        level: getLimit(statsKey, rarity),
        rarity,
      }

      if (statsKey === "adventurer") {
        state = {
          ...state,
          mana: "50",
          ex: "4",
        };
      } else {
        state = {
          ...state,
          unbind: "4",
          bond: "30",
        }
      }
    }
    updateDetails(statsKey, state);
    this.state = state || {};

    this.onChange = this.onChange.bind(this);
    this.setUpdates = this.setUpdates.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (this.state !== prevState) {
      const { statsKey, updateDetails } = this.props;
      updateDetails(statsKey, this.state);
    }
  }

  render() {
    const {
      uid,
      item,
      lang,
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
          const intUnbind = parseInt(unbind, 10);
          image = intUnbind >= 2 ? uid + "2" : uid + "1";
          break;
        default:
          image = uid;
          break;
      }
    }

    return (
      <Grid
        container
        style={{ height: "120px", marginTop: "10px" }}
      >
        <Grid
          container
          item xs={4}
          direction="column"
          justify="center"
          alignItems="center"
          // zeroMinWidth
          wrap="nowrap"
        >
          <StatsAvatar
            image={image}
            name={Name}
            lang={lang}
            statsKey={statsKey}
          />
        </Grid>

        {item && (
          <Fragment>
            <Grid
              container
              item xs={8}
              spacing={8}
              alignItems="center"
            >
              <Grid item xs={6}>
                <InputNumber
                  label="level"
                  lang={lang}
                  value={level}
                  onChange={this.onChange}
                />
              </Grid>

              {statsKey === "adventurer" && (
                <Fragment>
                  <Grid item xs={6}>
                    <SelectItem
                      label="rarity"
                      lang={lang}
                      value={rarity}
                      rarity={item.rarity}
                      onChange={this.onChange}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <SelectItem
                      label="mana"
                      lang={lang}
                      value={mana}
                      rarity={rarity}
                      onChange={this.onChange}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <SelectItem
                      label="ex"
                      lang={lang}
                      value={ex}
                      onChange={this.onChange}
                    />
                  </Grid>
                </Fragment>
              )}

              {statsKey !== "adventurer" && (
                <Grid item xs={6}>
                  <SelectItem
                    label="unbind"
                    lang={lang}
                    value={unbind}
                    onChange={this.onChange}
                  />
                </Grid>
              )}

              {statsKey === "dragon" && (
                <Grid item xs={6}>
                  <InputNumber
                    label="bond"
                    lang={lang}
                    value={bond}
                    onChange={this.onChange}
                  />
                </Grid>
              )}
            </Grid>
          </Fragment>
        )}
      </Grid>
    );
  }

  onChange = ({ target: { name, value } }) => {
    const updates = {
      [name]: value,
      ...this.setUpdates(name, value),
    }
    this.setState(updates);
  }

  setUpdates = (key, value) => {
    let updates = {};
    const { statsKey } = this.props;
    const { rarity, unbind, ex } = this.state;

    switch (key) {
      case "level":
        const intLevel = parseInt(value, 10) || "";
        const limit = getLimit(statsKey, rarity, unbind);
        updates.level = intLevel > limit ? limit : intLevel;
        break;
      case "rarity":
        updates = {
          level: getLimit(statsKey, value),
          mana: getLimit("mana", value),
          ex: value !== "5" ? "0" : "4",
        };
        break;
      case "mana":
        let newEx = "0";
        if (value === "50") {
          newEx = "4";
        } else if (value === "45") {
          newEx = ex;
        }
        updates.ex = newEx;
        break;
      case "ex":
        updates.mana = "45";
        break;
      case "unbind":
        updates.level = getLimit(statsKey, rarity, value);
        break;
      case "bond":
        const intBond = parseInt(value, 10) || 0;
        const bondLimit = getLimit("bond");
        updates.bond = intBond > bondLimit ? bondLimit : intBond;
        break;
      default:
        break;
    }

    return updates;
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
    updateDetails: (statsKey, state) => dispatch(updateDetails(statsKey, state)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsField);