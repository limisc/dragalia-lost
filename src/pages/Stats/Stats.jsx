import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectItem } from 'actions';
import content from 'data';
import Col1 from './Col1';
import Col2 from './Col2';
import Col3 from './Col3';

function Stats({ selectItem }) {
  const { lang = 'en' } = useParams();

  useEffect(() => {
    const keys = Object.keys(content.adventurer);
    const key = Math.floor(keys.length * Math.random());
    const item = content.adventurer[keys[key]];
    selectItem('adventurer', item);
  }, [selectItem]);

  return (
    <main id="stats">
      <Col1 lang={lang} />
      <Col2 lang={lang} />
      <Col3 lang={lang} />
    </main>
  );
}

const actionCreators = { selectItem };

export default connect(null, actionCreators)(Stats);
