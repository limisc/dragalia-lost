//@flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import FilterStats from './FilterStats';
import StatsList from './StatsList';

class SelectStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adventurer: ['weapon', 'element', 'rarity'],
      weapon: ['weapon', 'element', 'rarity'],
      wyrmprint: ['rarity'],
      dragon: ['element', 'rarity'],
    };
    this.searchRef = createRef();
  }

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
  return { dir };
};

export default connect(mapStateToProps)(SelectStats);
