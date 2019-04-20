//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { getDetails } from 'appRedux/actions';
import StatsDetail from './StatsDetail';

class DetailCol extends React.Component {
  state = {
    open: true,
  };

  render() {
    const { open } = this.state;
    const { stats, halidom } = this.props;
    const cursor = open ? 'n-resize' : 's-resize';
    const title = stats.adventurer ? stats.adventurer.name : '';
    const details = getDetails(stats, halidom);
    return (
      <>
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
}

const mapStateToProps = ({ stats, halidom }) => {
  return { stats, halidom };
};

export default connect(mapStateToProps)(DetailCol);
