/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SetBtns from './SetBtns';
import StatsDetail from './StatsDetail';

const DetailCol = () => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="column">
      <SetBtns expand={expand} setExpand={setExpand} />
      <StatsDetail expand={expand} />
    </div>
  );
};

export default DetailCol;
