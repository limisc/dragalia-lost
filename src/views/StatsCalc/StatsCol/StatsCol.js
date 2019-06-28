/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { refs, statsKeys } from 'store';
import StatsField from './StatsField';

const SetStats = ({ stats }) => {
  return (
    <div className="column" ref={refs.statsField}>
      {statsKeys.map(statsKey => {
        const item = stats[statsKey];
        const { id = statsKey } = item || {};
        return <StatsField key={id} statsKey={statsKey} item={item} />;
      })}
    </div>
  );
};

const mapStateToProps = ({ stats }) => {
  return { stats };
};

export default connect(mapStateToProps)(SetStats);
