
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Header,
  SetStats,
} from "views";
import DetailsCol from "./DetailsCol";
import SelectColumn from "../SelectColumn/SelectColumn";

class StatsCalc extends Component {

  render() {
    const {
      match: {
        params: {
          lang = "en",
          page = "stats"
        }
      },
    } = this.props;
    return (
      <Fragment>
        <Header />
        <main className="fluid content main">
          <div className="column">
            <DetailsCol
              lang={lang}
              page={page}
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