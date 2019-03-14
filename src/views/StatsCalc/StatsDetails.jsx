// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  translate,
} from "actions";
const propTypes = {

};

const defaultProps = {

};


class StatsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: ["adventurer", "weapon", "wyrmprint1", "wyrmprint2", "dragon", "ability", "halidom"],
    };
  }

  render() {
    const {
      match: { params: { lang = "en" } },
      stats,
      details,
    } = this.props;

    const {
      rows,
    } = this.state;

    const { adventurer } = stats;
    const { element } = adventurer || {};
    return (
      <Paper className="fluid">
        <Grid container style={{ padding: "16px" }}>
          <Grid
            container
            alignItems="center"
            style={{ height: "40px" }}
          >
            <Grid container item xs={3}></Grid>
            <Grid container item xs={3} justify="flex-end">HP</Grid>
            <Grid container item xs={3} justify="flex-end">STR</Grid>
            <Grid container item xs={3} justify="flex-end">Might</Grid>
          </Grid>

          {rows.map((row) => {
            let HP = 0, STR = 0, might = 0;
            if (details[row]) {
              const { [row]: detail } = details;
              if (
                (row === "weapon" || row === "dragon")
                && stats[row]
                && stats[row].element === element
              ) {
                HP = Math.ceil(detail.HP * 1.5);
                STR = Math.ceil(detail.STR * 1.5);
              } else {
                HP = detail.HP;
                STR = detail.STR;
              }
              might = HP + STR + detail.might;
            }
            return (
              <Grid
                key={row}
                container
                alignItems="center"
                className="details-list"
              >
                <Grid container item xs={3}>
                  <Typography noWrap>
                    {translate(row, lang)}
                  </Typography>
                </Grid>

                <Grid container item xs={3} justify="flex-end">{HP}</Grid>
                <Grid container item xs={3} justify="flex-end">{STR}</Grid>
                <Grid container item xs={3} justify="flex-end">{might}</Grid>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    );
  }
}


StatsDetails.propTypes = propTypes;
StatsDetails.defaultProps = defaultProps;

const mapStateToProps = ({
  stats,
  details,
}) => {
  return {
    stats,
    details,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //: () => dispatch(),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsDetails));