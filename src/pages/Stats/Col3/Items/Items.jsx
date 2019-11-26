import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import ItemList from './ItemList';

function Items({ focused, lang }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
  }, [focused]);

  return (
    <>
      <Filter lang={lang} search={search} setSearch={setSearch} />
      <ItemList lang={lang} search={search} />
    </>
  );
}

const mapStateToProps = ({ focused }) => {
  return {
    focused,
  };
};

export default connect(mapStateToProps)(Items);
