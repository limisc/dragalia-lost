// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Select } from "components";

import {
  translate,
  resetFilters,
  selectFilters,
} from "actions";

const propTypes = {
  fields: PropTypes.array.isRequired,
};

class FilterStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapon: ["", "Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
      element: ["", "Flame", "Water", "Wind", "Light", "Shadow"],
      rarity: ["", "5", "4", "3"],
      // tier: ["", "3", "2", "1"],
    };
  }

  render() {
    const {
      lang,
      fields,
      filters,
    } = this.props;

    return (
      <div className="filters">
        {fields.map((field) => (
          <div key={field} className="filter-select">
            <Select
              lang={lang}
              label={field}
              value={filters[field]}
              options={this.state[field]}
              onChange={this.onChange}
            />
          </div>
        ))}

        <div className="filter-select">
          <Button
            variant="contained"
            className="fluid button"
            onClick={this.onClick}
          >
            {translate("reset", lang)}
          </Button>
        </div>
      </div>
    );
  }

  onChange = ({ target: { name, value } }) => {
    this.props.selectFilters(name, value);
  }

  onClick = () => {
    this.props.resetFilters();
  }
}

FilterStats.propTypes = propTypes;

const mapStateToProps = ({ filters }) => {
  return {
    filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetFilters: () => dispatch(resetFilters()),
    selectFilters: (key, value) => dispatch(selectFilters(key, value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterStats);