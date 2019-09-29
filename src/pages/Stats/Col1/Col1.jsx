import React from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { calcDetails } from 'utils/calcStats';
import { resetStats } from 'actions';
import StatsTable from './StatsTable';
import Dungeon from './Dungeon';

// const SECTIONS = ['build', 'team'];

// eslint-disable-next-line no-shadow
function Col1({ stats, halidom, setPanel, resetStats }) {
  const [collapse, setCollapse] = React.useState(false);

  const handleCollapse = e => {
    setCollapse(e.target.checked);
  };

  const handleReset = () => {
    setPanel('stats');
    resetStats();
  };

  const details = React.useMemo(() => calcDetails(stats, halidom), [
    stats,
    halidom,
  ]);

  return (
    <div id="col1">
      <div className="col-2">
        <FormControlLabel
          control={
            <Checkbox
              disabled={!details}
              color="primary"
              checked={collapse}
              onChange={handleCollapse}
            />
          }
          label="CHECK"
        />
        <Button variant="outlined" onClick={handleReset}>
          RESET
        </Button>
      </div>
      <StatsTable details={details} collapse={collapse} />
      {stats.adventurer && collapse && (
        <Dungeon stats={stats} totalHp={details.total.hp} />
      )}
    </div>
  );
}

const mapStateToProps = ({ stats, halidom }) => {
  return { stats, halidom };
};

const actionCreators = {
  resetStats,
};

export default connect(
  mapStateToProps,
  actionCreators
)(Col1);
