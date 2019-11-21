import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Col2 from './Col2';
import Col3 from './Col3';

function Stats() {
  const { lang = 'en' } = useParams();
  const [panel, setPanel] = useState(false);
  return (
    <main id="stats">
      <div />
      <Col2 lang={lang} />
      <Col3 lang={lang} panel={panel} setPanel={setPanel} />
    </main>
  );
}

export default Stats;
