/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadHalidom, loadBuilds } from 'actions';
import Col1 from './Col1';
import Col2 from './Col2';
import Col3 from './Col3';

function Stats({ loadBuilds, loadHalidom }) {
  const { lang = 'en' } = useParams();

  useEffect(() => {
    loadHalidom();
    loadBuilds();
  }, [loadBuilds, loadHalidom]);

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
};

export default connect(null, mapDispatchToProps)(Stats);
