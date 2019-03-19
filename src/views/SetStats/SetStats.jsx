// @flow
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { statsFields } from "store";
import { syncStats } from "actions";
import StatsField from "./StatsField";
import "./styles.css";

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

    if (search !== state.search) {
      if (action === "POP") {
        syncStats(search);
      }

      return {
        search,
      };
    }

    return null;
  }

  render() {

    const {
      lang,
      stats,
    } = this.props;

    const {
      statsFields,
    } = this.state;

    return (
      <div className="fluid">
        {statsFields.map((statsKey) => {
          const { [statsKey]: item } = stats;
          const { id = statsKey } = item || {};
          return (
            <StatsField
              key={id}
              lang={lang}
              statsKey={statsKey}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ stats }) => {
  return {
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