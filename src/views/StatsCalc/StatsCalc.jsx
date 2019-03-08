/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import {
  Grid,
} from '@material-ui/core';
import { AppContext } from "context";
import { getTitle } from "actions";
import {
  Header,
  StatsSet,
  TablePanel,
} from "views";

class StatsCalc extends Component {

  render() {
    const { lang = "en" } = this.props.match.params;
    console.log(this.props)
    // document.title = getTitle(lang);
    // const { search } = this.props.location;
    // const q = {};
    // search.slice(1).split("&").forEach((v) => {
    //   console.log(v)
    //   const a = v.split("=");
    //   console.log("a", a)
    //   q[a[0]] = a.slice(1).join("=").replace(/~and~/g, "&");
    //   console.log("q[a[]],", a.slice(1).join("=").replace(/~and~/g, "&"))
    // })
    return (
      <AppContext.Provider value={{ lang }}>
        <Header match={this.props.match} />
        <main className="content fluid">
          <Grid container
            spacing={8}
            alignItems="flex-start"
          >
            <Grid container item xs={12} md={4} className="sticky">

            </Grid>
            <Grid container item xs={12} md={4} className="sticky">
              <StatsSet />
            </Grid>
            <Grid container item xs={12} md={4}
              className="sticky"
            >
              <TablePanel />
            </Grid>
          </Grid>
        </main>
      </AppContext.Provider>
    );
  }
}

StatsCalc.contextType = AppContext;

export default StatsCalc;