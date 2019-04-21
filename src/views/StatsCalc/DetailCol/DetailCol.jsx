//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { getDetails } from 'appRedux/actions';
import Settings from './Settings';
import StatsDetail from './StatsDetail';

class DetailCol extends React.Component {
  state = {
    open: true,
    dungeon: 'hmc',
  };

  render() {
    const { open } = this.state;
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
