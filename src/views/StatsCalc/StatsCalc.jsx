/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Context from "store/context";
import {
  Header,
  SetStats,
  SelectStats,
} from "views";

class StatsCalc extends Component {

  constructor(props) {
    super(props)

    this.parseSearch = this.parseSearch.bind(this);
  }
  render() {
    const {
      match: { params: { page = "stats_calc", lang = "en" } },
      location: { search },
    } = this.props;

    const {
      adventurer,
      weapon,
      wyrmprint1,
      wyrmprint2,
      dragon,
    } = this.parseSearch(search);

    return (
      <Context.Provider
        value={{
          lang,
          page,
          stats: {
            adventurer,
            weapon,
            wyrmprint1,
            wyrmprint2,
            dragon,
          }
        }}
      >
        <Header />
        <main className="fluid content">
          <Grid container
            spacing={8}
            alignItems="flex-start"
          >
            <Grid
              container
              item xs={12} md={4}
              className="sticky"
            >

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
      </Context.Provider>
    );
  }

  parseSearch = (search) => {
    const q = {};
    search.slice(1).split("&").forEach((v) => {
      const a = v.split("=");
      q[a[0]] = a[1];
    });
    return q;
  }
}

// StatsCalc.contextType = Context;

export default StatsCalc;