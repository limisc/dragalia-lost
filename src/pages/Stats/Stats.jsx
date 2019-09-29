import React from 'react';
import Col1 from './Col1';
import Col2 from './Col2';
import Col3 from './Col3';

function Stats() {
  const [panel, setPanel] = React.useState('stats');
  return (
    <main id="stats">
      <Col1 setPanel={setPanel} />
      <Col2 setPanel={setPanel} />
      <Col3 panel={panel} setPanel={setPanel} />
    </main>
  );
}

export default Stats;
