//@flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import FilterStats from './FilterStats';
import StatsList from './StatsList';

class SelectStats extends Component {
  state = {
    adventurer: ['weapon', 'element', 'rarity'],
    weapon: ['weapon', 'element', 'rarity'],
    wyrmprint: ['rarity'],
    dragon: ['element', 'rarity'],
  };

  render() {
    const { dir } = this.props;
    const { [dir]: fields } = this.state;
    return (
      <Fragment>
        <FilterStats fields={fields} />
        <StatsList key={dir} fields={fields} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ dir }) => {
  return {
    dir,
  };
};

export default connect(mapStateToProps)(SelectStats);
