/* eslint-disable no-unused-vars */
import React from 'react';
import StatsAvatar from './StatsAvatar';
import StatsField from './StatsField';
import HalidomStats from './stats/HalidomStats';

import { Grid } from '@material-ui/core';
const statsKeys = ["adventurer", "weapon", "wyrmprint", "dragon"];

const SettingPanel = () => {
  return (
    <>
      {statsKeys.map(statsKey =>
        <Grid container style={{ height: "128px" }} key={statsKey}>
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
          // justify="center"
          >
            <StatsField
              section={statsKey}
            />
          </Grid>
        </Grid>
      )}
      <HalidomStats />
    </>
  );
};

export default SettingPanel;