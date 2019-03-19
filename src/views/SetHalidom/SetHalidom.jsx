// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getHalidomOverview,
} from "actions";
import HalidomField from "./HalidomField";
import OverviewItem from './OverviewItem';

class SetHalidom extends Component {

  render() {
    const {
      halidom,
    } = this.props;

    const getOverview = getHalidomOverview();
    const overview = getOverview(halidom);
    const { element, weapon, dragon } = halidom;
    return (
      <Fragment>
        <OverviewItem
          view={overview.element}
          fieldKey="element"
          field={element}
        />
        <OverviewItem
          view={overview.weapon}
          fieldKey="weapon"
          field={weapon}
        />
        <OverviewItem
          view={overview.dragon}
          fieldKey="dragon"
          field={dragon}
        />

        <div className="halidom-field">
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
        </div>
      </Fragment >
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