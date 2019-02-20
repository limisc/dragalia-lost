/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';

import { AppContext } from "context";
import { translate, setFilters, resetFilters } from "actions";
import { Select } from "components";

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (key, value) => dispatch(setFilters(key, value)),
    resetFilters: () => dispatch(resetFilters()),
  };
}

class FilterStats extends Component {
  state = {
    type: ["", "Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
    element: ["", "Flame", "Water", "Wind", "Light", "Shadow"],
    rarity: ["", "5", "4", "3"],
    tier: ["", "3", "2", "1"],
  }

  _onChange = (e) => {
    this.props.setFilters(e.target.name, e.target.value);
  }

  _onClick = () => {
    this.props.resetFilters();
  }

  render() {
    const { lang } = this.context;
    const { filters, filterField } = this.props;
    return (
      <Grid container spacing={8}
      // style={{
      //   position: "-webkit-sticky",
      //   // eslint-disable-next-line
      //   position: "sticky",
      //   top: 16,
      // }}
      >
        {filterField.map(field => (
          <Grid item xs={6} lg={3} key={field}>
            <Select
              label={field}
              value={filters[field]}
              options={this.state[field]}
              onChange={this._onChange}
            />
          </Grid>
        ))}

        <Grid item xs={6} lg={3}>
          <Button
            className="btn"
            color="secondary"
            variant="outlined"
            onClick={this._onClick}
          >
            {translate("clear", lang)}
          </Button>
        </Grid>
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