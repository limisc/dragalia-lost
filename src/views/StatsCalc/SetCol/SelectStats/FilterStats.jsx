//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { translate, selectFilters, resetFilters } from 'appRedux/actions';
import { Select, withTheme } from 'components';
import { Button } from '@material-ui/core';

class FilterStats extends React.Component {
  state = {
    weapon: ['', 'Sword', 'Blade', 'Dagger', 'Axe', 'Lance', 'Bow', 'Wand', 'Staff'],
    element: ['', 'Flame', 'Water', 'Wind', 'Light', 'Shadow'],
    rarity: ['', '5', '4', '3'],
    tier: ['', '3', '2', '1'],
  };

  render() {
    const { lang, fields, filters } = this.props;
    return (
      <div className="fluid flex gutter">
        {fields.map(field => (
          <div key={field} className="col-2-4">
            <Select
              label={field}
              value={filters[field]}
              options={this.state[field]}
              onChange={this.onChange}
            />
          </div>
        ))}

        <div className="col-2-4">
          <Button variant="contained" onClick={this.onClick}>
            {translate('reset', lang)}
          </Button>
        </div>
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
  return {
    filters,
  };
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
