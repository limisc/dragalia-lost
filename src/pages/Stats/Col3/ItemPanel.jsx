import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Filter from './Filter';
import ItemList from './ItemList';

function StatsPanel({ focused }) {
  const { lang } = useParams();
  const ref = useRef();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
    ref.current.setValue('');
  }, [focused]);

  return (
    <>
      <Filter ref={ref} search={search} setSearch={setSearch} />
      <ItemList lang={lang} search={search} />
    </>
  );
}

const mapStateToProps = ({ focused }) => {
  return {
    focused,
  };
};

export default connect(mapStateToProps)(StatsPanel);
