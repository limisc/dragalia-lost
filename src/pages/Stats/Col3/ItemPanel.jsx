import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Filter from './Filter';
import ItemList from './ItemList';

function StatsPanel({ focused }) {
  const { lang } = useParams();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
  }, [focused]);

  return (
    <>
      <Filter search={search} setSearch={setSearch} />
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
