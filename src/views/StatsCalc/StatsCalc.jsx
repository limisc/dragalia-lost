/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';

import { AppContext } from "context";
import { getTitle } from "actions";
import DetailsPanel from "./DetailsPanel";
import StatsPanel from "views/StatsPanel";
import TablePanel from "views/TablePanel";

class StatsCalc extends Component {
  render() {
    const { lang = "en" } = this.props.match.params;
    document.title = getTitle(lang);
    return (
      <AppContext.Provider value={{ lang }}>
        <Grid
          container
          spacing={8}
          alignItems="flex-start"
        >
          <Grid container item xs={12} md={4}>
            <Paper className="fluid padding">
              <DetailsPanel />
            </Paper>
          </Grid>
          <Grid container item xs={12} md={4} className="sticky">
            <StatsPanel />
          </Grid>
          <Grid container item xs={12} md={4}>
            <TablePanel />
          </Grid>
        </Grid>
      </AppContext.Provider >
    );
  }
}

StatsCalc.contextType = AppContext;

export default StatsCalc;






















/*
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatsPanel from "./statsPanel/StatsPanel";
import SettingPanel from './settingPanel/SettingPanel';
import DetailsPanel from './detailPanel/DetailPanel';

import { translate, selectLanguage, resetAll } from "actions";



const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectLanguage: (language) => dispatch(selectLanguage(language)),
    resetAll: () => dispatch(resetAll()),
  };
}

class CalcStats extends Component {
  constructor(props) {
    super(props);
    this._selectLanguage = this._selectLanguage.bind(this);
  }

  render() {
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div className="four wide column">
          <div className="ui form">
            <div className="fields">
              <div className="field">
                <select value={this.props.language} onChange={this._selectLanguage}>
                  <option value="en">English</option>
                  <option value="zh">简中</option>
                  <option value="ja">日本語</option>
                </select>
              </div>

              <div className="field">
                <button className="ui button" onClick={this.props.resetAll}>{translate("reset", this.props.language)}</button>
              </div>
            </div>
          </div>
          <DetailsPanel />
        </div>

        <StatsPanel />
        <SettingPanel />
      </div >
    );
  }

  _selectLanguage = (e) => {
    this.props.selectLanguage(e.target.value);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalcStats);

*/