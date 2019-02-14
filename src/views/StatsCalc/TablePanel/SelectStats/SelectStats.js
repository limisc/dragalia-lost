/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterStats from "./FilterStats";
import StatsTable from "./StatsTable";

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
    const { language, focusSection, filters } = this.props;
    const {
      filterFields: { [focusSection]: filterField },
    } = this.state;

    return (
      <div className="six wide column">
        <FilterStats
          filterField={filterField}
        />

        <StatsTable
          fields={filterField}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectStats);