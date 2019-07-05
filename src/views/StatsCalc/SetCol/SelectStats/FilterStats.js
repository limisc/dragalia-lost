/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { translate, selectFilters, resetFilters } from 'actions';
import { Button, TextField } from '@material-ui/core';
import { Select, withTheme } from 'components';

class FilterStats extends React.Component {
  state = {
    rarity: ['', '5', '4', '3'],
    element: ['', 'Flame', 'Water', 'Wind', 'Light', 'Shadow'],
    type: ['', 'Core', 'Void', 'Limited'],
    weapon: [
      '',
      'Sword',
      'Blade',
      'Dagger',
      'Axe',
      'Lance',
      'Bow',
      'Wand',
      'Staff',
    ],
  };

  render() {
    const { lang, fields, filters, search } = this.props;
    return (
      <Fragment>
        <div className="flex gutter">
          {fields.map(f => (
            <Select
              key={f}
              label={f}
              value={filters[f]}
              classes="col-2 col-4"
              options={this.state[f]}
              onChange={this.onChange}
            />
          ))}
        </div>

        <div className="flex">
          <TextField
            className="fill-remains"
            variant="filled"
            value={search}
            label={translate('search', lang)}
            onChange={this.props.onChange}
          />

          <Button
            className="col-2 col-4"
            color="secondary"
            variant="contained"
            onClick={this.onClick}
          >
            REST
          </Button>
        </div>
      </Fragment>
    );
  }

  onChange = ({ target: { name, value } }) => {
    this.props.selectFilters(name, value);
  };

  onClick = () => {
    this.props.clear();
    this.props.resetFilters();
  };
}

const mapStateToProps = ({ filters }) => {
  return { filters };
};

const mapDispatchToProps = dispatch => {
  return {
    selectFilters: (key, value) => dispatch(selectFilters(key, value)),
    resetFilters: () => dispatch(resetFilters()),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FilterStats)
);
