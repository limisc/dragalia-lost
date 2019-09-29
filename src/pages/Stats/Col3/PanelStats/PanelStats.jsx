import React from 'react';
import { connect } from 'react-redux';
import { getField } from 'utils';
import FilterStats from './FilterStats';
import StatsList from './StatsList';

const FIELDS = {
  adventurer: ['weapon', 'element', 'rarity'],
  weapon: ['weapon', 'element', 'rarity'],
  wyrmprint: ['rarity'],
  dragon: ['element', 'rarity'],
};

function PanelStats({ field }) {
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setSearch('');
  }, [field]);

  return (
    <>
      <FilterStats
        fields={FIELDS[field]}
        search={search}
        setSearch={setSearch}
      />

      <StatsList field={field} fields={FIELDS[field]} search={search} />
    </>
  );
}

const mapStateToProps = ({ focused }) => {
  const field = getField(focused);
  return { field };
};

export default connect(mapStateToProps)(PanelStats);
