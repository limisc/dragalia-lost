/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import FilterStats from './FilterStats';
import StatsList from './StatsList/StatsList';

class SelectStats extends Component {
  state = {
    adventurer: ['weapon', 'element', 'rarity'],
    weapon: ['weapon', 'element', 'rarity', 'type'],
    wyrmprint: ['rarity'],
    dragon: ['element', 'rarity'],
    search: '',
  };

  clear = () => this.setState({ search: '' });
  onChange = e => this.setState({ search: e.target.value });

  render() {
    const { field } = this.props;
    const { [field]: fields, search } = this.state;
    return (
      <Fragment>
        <FilterStats
          key={field}
          fields={fields}
          search={search}
          onChange={this.onChange}
          clear={this.clear}
        />
        <StatsList fields={fields} search={search} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ field }) => {
  return { field };
};

export default connect(mapStateToProps)(SelectStats);
