// @flow
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
} from '@material-ui/core';

import FilterStats from "./FilterStats";
import StatsTable from "./StatsTable";


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
    };
  }

  render() {
    const {
      section,
    } = this.props;

    const { [section]: fields } = this.state.filterFields;

    return (
      <Paper className="fluid">
        1111
        {/* <FilterStats
          fields={fields}
        />

        <StatsTable
          fields={fields}
        /> */}
      </Paper>
    );
  }
}

export default SelectStats;






















/* eslint-disable no-unused-vars */
/*
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Paper } from '@material-ui/core';
      import FilterStats from "./FilterStats";
      import StatsTable from "./StatsTable";

const mapStateToProps = (state) => {
const {language, focusSection, filters } = state;
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
  const {language, focusSection, filters } = this.props;
  const {
        filterFields: {[focusSection]: filterField },
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
*/