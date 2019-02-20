/* eslint-disable no-unused-vars */
import React from 'react';
import { Paper, Grid } from '@material-ui/core';

import StatsAvatar from './StatsAvatar';
import StatsField from './StatsField';
import HalidomStats from './stats/HalidomStats';

const statsKeys = ["adventurer", "weapon", "wyrmprint", "dragon"];

const SettingPanel = () => {
  return (
    <Paper className="fluid">
      {statsKeys.map(statsKey =>
        <Grid container key={statsKey}>
          <Grid item xs={4}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <StatsAvatar
              section={statsKey}
            />
          </Grid>

          <Grid item xs={8}
            container
            spacing={8}
            alignItems="center"
          >
            <StatsField
              section={statsKey}
            />
          </Grid>
        </Grid>
      )}
      <HalidomStats />
    </Paper>
  );
};

export default SettingPanel;