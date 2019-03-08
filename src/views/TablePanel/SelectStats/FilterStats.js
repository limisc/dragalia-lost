/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';

import { AppContext } from "context";
import {
  translate,
  selectFilters,
  // resetFilters
} from "actions";
import { Select } from "components";

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectFilters: (key, value) => dispatch(selectFilters(key, value)),
    // resetFilters: () => dispatch(resetFilters()),
  };
}

class FilterStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ["", "Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
      element: ["", "Flame", "Water", "Wind", "Light", "Shadow"],
      rarity: ["", "5", "4", "3"],
      tier: ["", "3", "2", "1"],
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.props.selectFilters(e.target.name, e.target.value);
  }

  // _onClick = () => {
  //   this.props.resetFilters();
  // }

  render() {
    const {
      fields,
      filters,
    } = this.props;
    const { lang } = this.context;
    return (
      <Grid container spacing={8}>
        {fields.map((field) => (
          <Grid item xs={6} lg={3} key={field}>
            <Select
              label={field}
              value={filters[field]}
              options={this.state[field]}
              onChange={this.onChange}
            />
          </Grid>
        ))}

        {/* <Grid item xs={6} lg={3}>
          <Button
            className="btn"
            color="secondary"
            variant="outlined"
            onClick={this._onClick}
          >
            {translate("clear", lang)}
          </Button>
        </Grid> */}
      </Grid>
    );
  }


}

FilterStats.contextType = AppContext;

FilterStats.propTypes = {
  filterField: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterStats);