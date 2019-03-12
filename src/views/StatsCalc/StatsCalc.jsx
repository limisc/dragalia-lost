/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  SetStats,
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
              className="sticky"
            >
              <StatsDetails />
            </Grid>
            <Grid
              container
              item xs={12} md={4}
              className="sticky"
            >
              <SetStats />
            </Grid>
            <Grid
              container
              item xs={12} md={4}
              className="sticky"
            >
              <SelectStats />
            </Grid>
          </Grid>
        </main>
      </Fragment>
    );
  }

  // parseSearch = (search) => {
  //   const q = {};
  //   search.slice(1).split("&").forEach((v) => {
  //     const a = v.split("=");
  //     q[a[0]] = a[1];
  //   });
  //   return q;
  // }
}

// StatsCalc.contextType = Context;

export default StatsCalc;