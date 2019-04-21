//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { getDetails } from 'appRedux/actions';
import Settings from './Settings';
import StatsDetail from './StatsDetail';
import DungeonDetail from './DungeonDetail';

class DetailCol extends React.Component {
  state = {
    open: false,
    dungeon: 'hmc',
    exHP: '',
    exDef: '',
    HP: '',
    def: '',
  };

  render() {
    const { open, ...res } = this.state;
    const { stats, halidom } = this.props;
    const cursor = open ? 'n-resize' : 's-resize';
    const title = stats.adventurer ? stats.adventurer.name : '';
    const details = getDetails(stats, halidom);
    return (
      <>
        <Settings />
        <StatsDetail
          cursor={cursor}
          open={open}
          title={title}
          details={details}
          onClick={this.onClick}
        />
        <DungeonDetail details={details} onChange={this.onChange} {...res} />
      </>
    );
  }

  onClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });
}

const mapStateToProps = ({ stats, halidom }) => {
  return { stats, halidom };
};

export default connect(mapStateToProps)(DetailCol);
