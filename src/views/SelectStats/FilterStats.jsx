// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Select } from "components";
import { selectFilters } from "actions";

const propTypes = {
  fields: PropTypes.array.isRequired,
};

class FilterStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ["", "Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
      element: ["", "Flame", "Water", "Wind", "Light", "Shadow"],
      rarity: ["", "5", "4", "3"],
      tier: ["", "3", "2", "1"],
    };
  }

  render() {
    const {
      fields,
      filters,
    } = this.props;


    return (
      <Grid container spacing={8} className="filters top">
        {fields.map((field) => (
          <Grid
            key={field}
            item xs={6} lg={3}
          >
            <Select
              label={field}
              value={filters[field]}
              options={this.state[field]}
              onChange={this.onChange}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  onChange = ({ target: { name, value } }) => {
    this.props.selectFilters(name, value);
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
    selectFilters: (key, value) => dispatch(selectFilters(key, value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterStats);