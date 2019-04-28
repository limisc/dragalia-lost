/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import DetailCol from './DetailCol';
import SetCol from './SetCol';
import StatsCol from './StatsCol';

const StatsCalc = () => {
  return (
    <Fragment>
      <DetailCol />
      <StatsCol />
      <SetCol />
    </Fragment>
  );
};

export default StatsCalc;
