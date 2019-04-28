/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { refs, statsKeys } from 'store';
import StatsField from './StatsField';

class SetStats extends React.Component {
  render() {
    const { stats } = this.props;
    return (
      <div className="column" ref={refs.statsField}>
        {statsKeys.map(statsKey => {
          const id = stats[statsKey] ? stats[statsKey].id : statsKey;
          return <StatsField key={id} statsKey={statsKey} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ stats }) => {
  return { stats };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO clear
    //: () => dispatch(),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetStats);
