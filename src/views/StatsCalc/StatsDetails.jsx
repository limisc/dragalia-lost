// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
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
    };
  }

  render() {
    const {
      lang,
      stats,
      details,
    } = this.props;

    const {
      rows,
    } = this.state;

    const { adventurer } = stats || {};
    const { name: { [lang]: label = "" } = {} } = adventurer || {};
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
            <tr>
              <th>{label}</th>
              <th>{translate("HP", lang)}</th>
              <th>{translate("STR", lang)}</th>
              <th>{translate("might", lang)}</th>
            </tr>

            {rows.map((row) => {
              let { HP = 0, STR = 0, might = 0 } = details[row] || {};
              return (
                <tr key={row}>
                  <td>{translate(row, lang)}</td>
                  <td>{HP}</td>
                  <td>{STR}</td>
                  <td>{might}</td>
                </tr>
              )
            })}
          </tbody>

        </table>

      </div>
    );
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