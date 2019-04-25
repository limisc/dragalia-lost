/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import SetCol from './SetCol';
import StatsCol from './StatsCol';


const StatsCalc = () => {
  return (
    <Fragment>
      <div className="column" />
      <StatsCol />
      <SetCol />
    </Fragment>
  );
};

export default StatsCalc;
