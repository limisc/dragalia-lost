import React, { Fragment } from 'react';
import DetailCol from './DetailCol';
import SetStats from './SetStats';
import SetCol from './SetCol';
import { refs } from 'appRedux/store';

const StatsCalc = () => {
  return (
    <Fragment>
      <div className="column">
        <DetailCol />
      </div>
      <div className="column" ref={refs.setStats}>
        <SetStats />
      </div>
      <div className="column">
        <SetCol />
      </div>
    </Fragment>
  );
};

export default StatsCalc;
