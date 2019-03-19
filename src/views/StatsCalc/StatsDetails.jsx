// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import {
  translate,
  getHalidomOverview,
} from "actions";
import "./styles.css";


const propTypes = {

};

const defaultProps = {

};


class StatsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        "adventurer",
        "weapon",
        "wyrmprint1",
        "wyrmprint2",
        "dragon",
        "ability",
        "halidom"
      ],
      open: true,
    };
  }

  render() {
    const {
      lang,
      stats,
      details,
      halidom,
    } = this.props;

    const {
      rows,
      open,
    } = this.state;

    const { adventurer } = stats || {};
    const { name: { [lang]: label = "" } = {} } = adventurer || {};

    const getOverview = getHalidomOverview();
    const overview = getOverview(halidom);
    const newDetails = this.buildDetails(details, overview, stats);
    const { HP: totalHP = 0, STR: totalSTR = 0, might: totalMight = 0 } = newDetails.total || {};
    return (
      <div
        style={{
          width: "100%",
        }}
      >
        <table
          className="details-table"
          style={{
            width: "100%",
          }}
        >
          <tbody>
            <tr onClick={this.onClick}>
              <th>{label}</th>
              <th>{translate("HP", lang)}</th>
              <th>{translate("STR", lang)}</th>
              <th>{translate("might", lang)}</th>
            </tr>
            {rows.map((row) => {
              let { HP = 0, STR = 0, might = 0 } = newDetails[row] || {};
              return (
                <tr key={row}>
                  <td>{translate(row, lang)}</td>
                  <td>{HP}</td>
                  <td>{STR}</td>
                  <td>{might}</td>
                </tr>
              )
            })}
            <tr>
              <td>{translate("total", lang)}</td>
              <td>{totalHP}</td>
              <td>{totalSTR}</td>
              <td>{totalMight}</td>
            </tr>
          </tbody>

        </table>

      </div>
    );
  }

  onClick = () => {
    this.setState(state => ({ open: !state.open }));
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


StatsDetails.propTypes = propTypes;
StatsDetails.defaultProps = defaultProps;

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

const mapDispatchToProps = (dispatch) => {
  return {
    //: () => dispatch(),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsDetails);