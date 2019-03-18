/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  SetStats,
  // SetHalidom,
  SelectStats,
} from "views";
import StatsDetails from "./StatsDetails";
import SelectColumn from "../SelectColumn/SelectColumn";
class StatsCalc extends Component {

  render() {
    return (
      <Fragment>
        <Header />
        <div className="fluid content">
          <div className="column">
            {/* <StatsDetails /> */}
          </div>
          <div className="column">
            <SetStats />
          </div>
          <div className="column">
            <SelectColumn />
          </div>
        </div >
      </Fragment >
    );
  }
}

export default StatsCalc;