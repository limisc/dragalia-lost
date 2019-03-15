// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Image } from "components";

const propTypes = {
  view: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};

const defaultProps = {
  view: { HP: 0, STR: 0 },
};


class OverviewItem extends React.PureComponent {
  render() {
    const {
      view,
      field,
      fieldKey,
    } = this.props;
    return (
      <Grid
        key={field}
        container
        className="halidom-overview"
        justify="center"
        alignItems="center"
        style={{ padding: "32px" }}
      >
        <Grid
          container
          item xs={6}
          justify="center"
          alignItems="center"
        >
          <Image
            size="sm"
            statsKey="icon"
            image={`${field}_${fieldKey}`}
          />
        </Grid>

        <Grid
          container
          item xs={3}
          justify="flex-end"
          alignItems="center"
        >
          {view.HP}
        </Grid>

        <Grid
          container
          item xs={3}
          justify="flex-end"
          alignItems="center"
        >
          {view.STR}
        </Grid>
      </Grid>
    );
  }
}

OverviewItem.propTypes = propTypes;
OverviewItem.defaultProps = defaultProps;

export default OverviewItem;