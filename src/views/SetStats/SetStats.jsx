// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import StatsField from "./StatsField";
import { statsFields } from "store";
import {
  getSection,
  parseSearch,
  syncStats,
} from "actions";

const propTypes = {

};

const defaultProps = {

};


class SetStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props) {
    const {
      history: { action },
      location: { search },
      syncStats,
    } = props;

    if (action === "POP" && search !== props.search) {
      syncStats(search);
    }

    return null;
  }

  render() {

    const {
      stats,
      match: { params: { lang = "en" } },
    } = this.props;

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