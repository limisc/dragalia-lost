import React, { Fragment } from 'react';
import DetailCol from './DetailCol';
import SetStats from './SetStats';
import SetCol from './SetCol';

const StatsCalc = () => {
  return (
    <Fragment>
      <div className="column">
        <DetailCol />
      </div>
      <div className="column">
        <SetStats />
      </div>
      <div className="column">
        <SetCol />
      </div>
    </Fragment>
  );
};

export default StatsCalc;
