/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import FilterStats from './FilterStats';

class SelectStats extends Component {
  state = {
    adventurer: ['weapon', 'element', 'rarity'],
    weapon: ['weapon', 'element', 'rarity'],
    wyrmprint: ['rarity'],
    dragon: ['element', 'rarity'],
  };

  render() {
    const { field } = this.props;
    const { [field]: fields } = this.state;
    return (
      <Fragment>
        <FilterStats fields={fields} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ field }) => {
  return { field };
};

export default connect(mapStateToProps)(SelectStats);
