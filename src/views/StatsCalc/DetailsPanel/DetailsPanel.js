/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { AppContext, history } from "context";
import { translate, resetAll } from "actions";
import { Select } from "components";

const mapStateToProps = (state) => {
  const { stats, halidom, details } = state;
  return {
    stats,
    halidom,
    details
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetAll: () => dispatch(resetAll()),
  };
}

class DetailsPanel extends Component {
  state = {
    rows: ["adventurer", "weapon", "wyrmprint", "dragon", "ability", "halidom"]
  }

  _changeLang = (e) => {
    history.push(`/${e.target.value}`);
  }

  _getTotal = (details) => {
    let HP = 0, STR = 0;
    const keys = Object.keys(details);
    for (const k of keys) {
      HP += details[k].HP;
      STR += details[k].STR;
    }
    return { HP, STR };
  }


  render() {
    const { lang } = this.context;
    const { details } = this.props;
    const total = this._getTotal(details);
    return (
      <Fragment>
        <Grid container spacing={8}>

          <Grid item xs={6} sm={3}>
            <Select
              value={lang}
              built
              options={[
                { value: "en", label: "English" },
                { value: "zh", label: "简中" },
                { value: "ja", label: "日本語" },
              ]}
              onChange={this._changeLang}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <Button
              className="btn"
              color="secondary"
              variant="outlined"
              onClick={this.props.resetAll}
            >
              {translate("reset", lang)}
            </Button>
          </Grid>
        </Grid>

        <Table className="details-table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">{translate("HP", lang)}</TableCell>
              <TableCell align="right">{translate("STR", lang)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row}>
                <TableCell>{translate(row, lang)}</TableCell>
                <TableCell align="right">{details[row].HP}</TableCell>
                <TableCell align="right">{details[row].STR}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell>{translate("total", lang)}</TableCell>
              <TableCell align="right">{total.HP}</TableCell>
              <TableCell align="right">{total.STR}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </Fragment>
    );
  }
}

DetailsPanel.contextType = AppContext;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsPanel);