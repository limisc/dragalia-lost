import React from 'react';
import { connect } from 'react-redux';
import { STATS_KEYS } from 'data';
import StatsField from './StatsField';

function Col2({ setPanel, stats }) {
  const [prefix, setId] = React.useState('adventurer');

  React.useEffect(() => {
    const { id = 'adventurer' } = stats.adventurer || {};
    setId(id);
  }, [stats.adventurer]);

  return (
    <div id="col2">
      {STATS_KEYS.map(k => {
        const item = stats[k];
        const { id = k } = item || {};

        return (
          <StatsField
            key={`${prefix}_${id}`}
            statsKey={k}
            item={item}
            setPanel={setPanel}
          />
        );
      })}
    </div>
  );
}

const mapStateToProps = ({ stats }) => {
  return { stats };
};

export default connect(mapStateToProps)(Col2);
