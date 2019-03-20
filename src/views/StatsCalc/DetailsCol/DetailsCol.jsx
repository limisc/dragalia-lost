// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getHalidomOverview,
} from "actions";
import StatsDetails from "./StatsDetails";
import DamageCalc from "./DamageCalc";
import "./styles.css";

class DetailsCol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const {
      lang,
      page,
      stats,
      details,
      halidom,
    } = this.props;

    const { open } = this.state;
    const { adventurer } = stats || {};
    const {
      name: {
        [lang]: label = ""
      } = {}
    } = adventurer || {};

    const getOverview = getHalidomOverview();
    const overview = getOverview(halidom);
    const newDetails = this.buildDetails(details, overview, stats);
    const { total } = newDetails;
    return (
      <Fragment>
        {page === "stats" && (
          <StatsDetails
            open={open}
            lang={lang}
            label={label}
            details={newDetails}
            onClick={this.onClick}
          />
        )}

        {page === "dungeon" && (
          <DamageCalc
            open={open}
            lang={lang}
            label={label}
            stats={stats}
            total={total}
            onClick={this.onClick}
          />
        )}
      </Fragment>
    );
  }

  buildDetails = (details, overview, stats) => {
    const { adventurer, dragon } = stats;
    const result = { ...details };
    let HP = Math.ceil(details.adventurer.HP * (overview.element.HP + overview.weapon.HP) * 0.01);
    let STR = Math.ceil(details.adventurer.STR * (overview.element.STR + overview.weapon.STR) * 0.01);
    if (dragon) {
      HP += Math.ceil(details.dragon.HP * overview.dragon.HP * 0.01);
      STR += Math.ceil(details.dragon.STR * overview.dragon.STR * 0.01);
    }
    result.halidom = {
      HP,
      STR,
      might: HP + STR,
    }
    let totalHP = 0, totalSTR = 0, totalMight = 0;
    Object.keys(result).forEach((k) => {
      totalHP += result[k].HP;
      totalSTR += result[k].STR;
      totalMight += result[k].might;
    });

    if (
      adventurer
      && dragon
      && adventurer.element === dragon.element
    ) {
      const intUnbind = parseInt(dragon.unbind, 10);
      const abilityName = intUnbind === 4 ? "ability2" : "ability1";

      HP = Math.ceil(totalHP * dragon[abilityName].HP * 0.01);
      STR = Math.ceil(totalSTR * dragon[abilityName].STR * 0.01);

      totalHP += HP;
      totalSTR += STR;
      result.ability = {
        HP,
        STR,
        might: 0,
      };
    }

    result.total = {
      HP: totalHP,
      STR: totalSTR,
      might: totalMight,
    };
    return result;
  }
}

const mapStateToProps = ({
  stats,
  halidom,
  details,
}) => {
  return {
    stats,
    halidom,
    details,
  };
}

export default connect(
  mapStateToProps,
)(DetailsCol);