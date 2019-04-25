/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { translate, selectFilters, resetFilters } from 'actions';
import { Button } from '@material-ui/core';
import { Select, withTheme } from 'components';

class FilterStats extends React.Component {
  state = {
    rarity: ['', '5', '4', '3'],
    element: ['', 'Flame', 'Water', 'Wind', 'Light', 'Shadow'],
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
    const { lang, fields, filters } = this.props;
    return (
      <div className="select flex gutter">
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

        <Button
          className="col-2 col-4"
          color="secondary"
          variant="contained"
          onClick={this.onClick}
        >
          {translate('reset', lang)}
        </Button>
      </div>
    );
  }

  onChange = ({ target: { name, value } }) => {
    this.props.selectFilters(name, value);
  };

  onClick = () => {
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
