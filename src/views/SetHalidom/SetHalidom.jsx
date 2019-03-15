// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import {
  getHalidomOverview,
} from "actions";
import HalidomField from "./HalidomField";
import OverviewItem from './OverviewItem';

class SetHalidom extends Component {

  render() {
    const {
      adventurer,
      dragon,
      overview,
    } = this.props;

    const { element, type } = adventurer || {};
    const { element: dragonElement } = dragon || {};
    return (
      <Paper className="fluid">
        {adventurer && (
          <Fragment>
            <OverviewItem
              view={overview.element}
              field="element"
              fieldKey={element}
            />
            <OverviewItem
              view={overview.weapon}
              field="weapon"
              fieldKey={type}
            />
          </Fragment>
        )}

        {dragon && (
          <OverviewItem
            view={overview.dragon}
            field="dragon"
            fieldKey={dragonElement}
          />
        )}
        <HalidomField
          key={element}
          field="element"
          fieldType={element}
        />
        <HalidomField
          key={type}
          field="weapon"
          fieldType={type}
        />

        <HalidomField
          key={`dragon_${dragonElement}`}
          field="dragon"
          fieldType={dragonElement}
        />
      </Paper>
    );
  }
}

const mapStateToProps = ({
  halidom,
  stats: { adventurer, dragon },
}) => {
  const makeOverview = getHalidomOverview();
  return {
    adventurer,
    dragon,
    overview: makeOverview(halidom),
  };
}

export default connect(
  mapStateToProps,
)(SetHalidom);