/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import FilterStats from "./FilterStats";
import StatsTable from "./StatsTable";
import { getSection } from "actions";
const mapStateToProps = (state) => {
  const { language, focusSection, filters } = state;
  return {
    language,
    focusSection,
    filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

class SelectStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFields: {
        adventurer: ["type", "element", "rarity"],
        weapon: ["type", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["element", "rarity"],
      },
    }
  }

  render() {
    const { focusSection } = this.props;
    const section = getSection(focusSection);
    const {
      filterFields: { [section]: filterField },
    } = this.state;

    return (
      <Paper className="fluid padding">
        <FilterStats
          filterField={filterField}
        />

        <StatsTable
          fields={filterField}
        />
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectStats);