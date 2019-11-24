import React from 'react';
import { useParams } from 'react-router-dom';
import Col1 from './Col1';
import Col2 from './Col2';
import Col3 from './Col3';

function Stats() {
  const { lang = 'en' } = useParams();
  return (
    <main id="stats">
      <Col1 lang={lang} />
      <Col2 lang={lang} />
      <Col3 lang={lang} />
    </main>
  );
}

export default Stats;
