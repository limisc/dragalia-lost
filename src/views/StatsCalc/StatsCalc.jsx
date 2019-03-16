/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  SetStats,
  SetHalidom,
  SelectStats,
} from "views";
import StatsDetails from "./StatsDetails";
class StatsCalc extends Component {

  render() {
    return (
      <Fragment>
        <Header />
        <main className="fluid content">
          <Grid
            container
            spacing={8}
            alignItems="flex-start"
          >
            <Grid
              container
              item xs={12} md={4}
            // className="sticky"
            >
              {/* <StatsDetails /> */}
              {/* <SetHalidom /> */}
            </Grid>

            <Grid
              container
              item xs={12} md={4}
            // className="sticky"
            >
              <SetStats />
            </Grid>
            <Grid
              container
              item xs={12} md={4}
            // className="sticky"
            >
              <SelectStats />
            </Grid>
          </Grid>
        </main >
      </Fragment >
    );
  }
}

export default StatsCalc;