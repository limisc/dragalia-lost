// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getLimit,
  updateStats,
} from "actions";

import StatsAvatar from "./StatsAvatar";
import InputNumber from "./InputNumber";
import SelectItem from './SelectItem';

const propTypes = {
  lang: PropTypes.string,
  statsKey: PropTypes.string,
};

class StatsField extends Component {

  constructor(props) {
    super(props);
    const { bond, level } = props.item || {};
    this.state = {
      bond,
      level,
    }
  }

  render() {
    const {
      lang,
      item,
      statsKey,
    } = this.props;

    const { bond, level } = this.state;
    const {
      ex,
      id,
      mana,
      name,
      unbind,
      rarity,
      curRarity,
    } = item || {};

    let image;
    if (item) {
      switch (statsKey) {
        case "adventurer":
          image = id + curRarity;
          break;
        case "wyrmprint1":
        case "wyrmprint2":
          const intUnbind = parseInt(unbind, 10);
          image = intUnbind >= 2 ? id + "2" : id + "1";
          break;
        default:
          image = id;
          break;
      }
    }
    return (
      <div className="stats-field">
        <div className="stats-avatar">
          <StatsAvatar
            lang={lang}
            image={image}
            statsKey={statsKey}
            name={name}
          />
        </div>

        {item && (
          <div className="stats-setting">
            <InputNumber
              label="level"
              lang={lang}
              value={level}
              onChange={this.onChange}
            />

            {statsKey === "adventurer" && (
              <Fragment>
                <div className="item-field">
                  <SelectItem
                    label="rarity"
                    lang={lang}
                    value={curRarity}
                    rarity={rarity}
                    onChange={this.onChange}
                  />
                </div>

                <div className="item-field">
                  <SelectItem
                    label="mana"
                    lang={lang}
                    value={mana}
                    rarity={rarity}
                    onChange={this.onChange}
                  />
                </div>

                <div className="item-field">
                  <SelectItem
                    label="ex"
                    lang={lang}
                    value={ex}
                    onChange={this.onChange}
                  />
                </div>
              </Fragment>
            )}

            {statsKey !== "adventurer" && (
              <div className="item-field">
                <SelectItem
                  label="unbind"
                  lang={lang}
                  value={unbind}
                  onChange={this.onChange}
                />
              </div>
            )}

            {statsKey === "dragon" && (
              <InputNumber
                label="bond"
                lang={lang}
                value={bond}
                onChange={this.onChange}
              />
            )}
          </div>
        )}
      </div >
    );
  }

  onChange = ({ target: { name, value } }) => {
    const updates = this.getUpdates(name, value);
    const {
      statsKey,
      updateStats,
    } = this.props;
    if (name === "level" || name === "bond") {
      let { timerId } = this.state;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (updates[name] === "") {
          updates[name] = 1;
          this.setState({
            [name]: 1,
          });
        }
        updateStats(statsKey, updates);
      }, 1000);

      this.setState({
        timerId,
        [name]: updates[name],
      });
    } else {
      if (updates.level) {
        this.setState({ level: updates.level });
      }
      updateStats(statsKey, updates);
    }
  }

  getUpdates = (key, value) => {
    let updates = { [key]: value };
    const { statsKey, item } = this.props;
    const {
      ex,
      unbind,
      rarity,
      curRarity,
    } = item;

    switch (key) {
      case "level":
        const temp = statsKey === "adventurer" ? curRarity : rarity;
        const intLevel = parseInt(value, 10) || "";
        const limit = getLimit(statsKey, temp, unbind);
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

const mapStateToProps = ({ stats }, { statsKey }) => {
  const item = stats[statsKey];
  return {
    item,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStats: (statsKey, updates) => dispatch(updateStats(statsKey, updates)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsField);