import React, { memo } from 'react';
import Filter from './Filter';

const Col3 = memo(function Col3() {
  return (
    <div id="stats-col3">
      <Filter />
    </div>
  );
});

export default Col3;
