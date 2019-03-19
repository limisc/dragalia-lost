/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
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
    const {
      match: { params: { lang = "en" } },
    } = this.props;
    return (
      <Fragment>
        <Header />
        <main className="fluid content main">
          <div className="column">
            <StatsDetails
              lang={lang}
            />
          </div>
          <div className="column">
            <SetStats
              lang={lang}
            />
          </div>
          <div className="column">
            <SelectColumn
              lang={lang}
            />
          </div>
        </main >
      </Fragment >
    );
  }
}

export default withRouter(StatsCalc);