// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import StatsField from "./StatsField";
import { statsFields } from "store";
import {
  syncStats,
} from "actions";
import store from "store";
const propTypes = {

};

const defaultProps = {

};


class SetStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsFields,
      search: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      syncStats,
      history: { action },
      location: { search },
    } = props;

    console.log(action)
    if (action === "POP" && search !== state.search) {
      syncStats(search);
      return {
        search,
      };
    }

    return null;
  }

  render() {

    const {
      stats,
      match: { params: { lang = "en" } },
    } = this.props;

    const {
      statsFields,
    } = this.state;

    return (
      <Paper className="fluid">
        {statsFields.map((statsKey) => {
          const { [statsKey]: item } = stats;
          const { Id } = item || {};
          const key = Id || statsKey;
          return (
            <StatsField
              key={key}
              uid={Id}
              item={item}
              lang={lang}
              statsKey={statsKey}
            />
          );
        })}
      </Paper>
    );
  }
}

SetStats.propTypes = propTypes;
SetStats.defaultProps = defaultProps;

const mapStateToProps = ({
  search,
  stats,
}) => {
  return {
    search,
    stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    syncStats: (search) => dispatch(syncStats(search)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetStats));