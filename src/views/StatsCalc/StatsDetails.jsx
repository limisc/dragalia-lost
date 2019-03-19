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
      ...res
    } = this.props;

    const {
      rows,
    } = this.state;

    return (
      <Grid container style={{ padding: "16px" }}>
        <Grid
          container
          alignItems="center"
          style={{ height: "40px" }}
        >
          <Grid container item xs={3}></Grid>
          <Grid container item xs={3} justify="flex-end">{translate("HP", lang)}</Grid>
          <Grid container item xs={3} justify="flex-end">{translate("STR", lang)}</Grid>
          <Grid container item xs={3} justify="flex-end">{translate("might", lang)}</Grid>
        </Grid>
      </Grid>
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