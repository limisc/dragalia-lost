// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Image } from "components";

const propTypes = {
  view: PropTypes.object.isRequired,
  field: PropTypes.object,
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

    if (field) {
      const { key } = field;
      return (
        <Grid
          key={field}
          container
          className="halidom-overview"
          justify="center"
          alignItems="center"
        >
          <Grid
            container
            item xs={4}
            justify="center"
            alignItems="center"
          >
            <Image
              size="sm"
              statsKey="icon"
              image={`${fieldKey}_${key}`}
            />
          </Grid>

          <Grid
            container
            item xs={4}
            justify="center"
            alignItems="center"
          >
            {view.HP}
          </Grid>

          <Grid
            container
            item xs={4}
            justify="center"
            alignItems="center"
          >
            {view.STR}
          </Grid>
        </Grid>
      );
    }

    return null;
  }
}

OverviewItem.propTypes = propTypes;
OverviewItem.defaultProps = defaultProps;

export default OverviewItem;