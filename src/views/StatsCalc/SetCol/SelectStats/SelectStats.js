/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { refs } from 'store';
import FilterStats from './FilterStats';
import StatsList from './StatsList/StatsList';

class SelectStats extends Component {
  state = {
    adventurer: ['weapon', 'element', 'rarity'],
    weapon: ['weapon', 'element', 'type'],
    wyrmprint: ['rarity'],
    dragon: ['element', 'rarity'],
  };

  render() {
    const { field } = this.props;
    const { [field]: fields } = this.state;
    return (
      <Fragment>
        <FilterStats fields={fields} />
        <StatsList ref={refs.searchBar} key={field} fields={fields} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ field }) => {
  return { field };
};

export default connect(mapStateToProps)(SelectStats);
