// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { Select } from "components";
import {
  selectFilters,
  selectFocus,
} from "actions";

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

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  render() {
    const {
      fields,
      filters,
      selectFocus,
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

        <Grid item xs={6} lg={3}>
          <Button
            variant="contained"
            style={{ height: "56px", width: "100%" }}
            onClick={this.onClick}
          >
            Set Halidom
          </Button>
        </Grid>
      </Grid>
    );
  }

  onChange = ({ target: { name, value } }) => {
    this.props.selectFilters(name, value);
  }

  onClick = () => {
    this.props.selectFocus("halidom");
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
    selectFocus: (statsKey) => dispatch(selectFocus(statsKey)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterStats);