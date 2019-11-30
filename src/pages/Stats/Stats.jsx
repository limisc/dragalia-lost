import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadHalidom, loadBuilds, selectFocus } from 'actions';
import Col1 from './Col1';
import Col2 from './Col2';
import Col3 from './Col3';

function Stats({ loadBuilds, loadHalidom, selectFocus }) {
  const { lang = 'en' } = useParams();

  useEffect(() => {
    loadHalidom();
    loadBuilds();
    selectFocus('adventurer');
  }, [loadBuilds, loadHalidom, selectFocus]);

  return (
    <main id="stats">
      <Col1 lang={lang} />
      <Col2 lang={lang} />
      <Col3 lang={lang} />
    </main>
  );
}

const mapDispatchToProps = {
  loadHalidom,
  loadBuilds,
  selectFocus,
};

export default connect(null, mapDispatchToProps)(Stats);
