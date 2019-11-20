import React, { memo } from 'react';
import ItemPanel from './ItemPanel';

const Col3 = memo(function Col3() {
  return (
    <div id="stats-col3">
      <ItemPanel />
    </div>
  );
});

export default Col3;
