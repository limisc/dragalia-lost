// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid, Button } from '@material-ui/core';
import {
  getHalidomOverview,
} from "actions";
import HalidomField from "./HalidomField";
import OverviewItem from './OverviewItem';

class SetHalidom extends Component {

  render() {
    const {
      halidom: { element, weapon, dragon },
    } = this.props;

    // const { element, weapon } = adventurer || {};
    // const { element: dragonElement } = dragon || {};
    return (
      <Fragment>
        {/* {adventurer && (
          <Fragment>
            <OverviewItem
              view={overview.element}
              field="element"
              fieldKey={element}
            />
            <OverviewItem
              view={overview.weapon}
              field="weapon"
              fieldKey={weapon}
            />
          </Fragment>
        )} */}

        {/* {dragon && (
          <OverviewItem
            view={overview.dragon}
            field="dragon"
            fieldKey={dragonElement}
          />
        )} */}
        <HalidomField
          field="element"
          facilities={element}
        />
        <HalidomField
          field="weapon"
          facilities={weapon}
        />

        <HalidomField
          field="dragon"
          facilities={dragon}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ halidom }) => {
  return {
    halidom,
  };
}

export default connect(
  mapStateToProps,
)(SetHalidom);