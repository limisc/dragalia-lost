// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Paper,
} from '@material-ui/core';
import {
  elementFacilities,
  weaponFacilities,
  dragonFacilities,
} from "data/facility";
import { resetFacility } from "actions";
import ListItem from './ListItem';

const propTypes = {

};

const defaultProps = {

};


class SetHalidom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: "",
      weapon: "",
      dragon: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      adventurer,
      dragon,
    } = props;
    const { element, type } = adventurer || {};
    const { element: dragonElement } = dragon || {};

    if (element !== state.element
      || type !== state.weapon
      || dragonElement !== state.dragon
    ) {
      const newState = {
        element,
        weapon: type,
        dragon: dragonElement,
      };

      return newState;
    }

    return null;
  }

  render() {
    const {
      adventurer,
      dragon,
      match: { params: { lang = "en" } },
    } = this.props;

    console.log(this.state)

    const { element, type } = adventurer || {};
    const { element: dragonElement } = dragon || {};

    const { [element]: elementFacility } = elementFacilities;
    const { [type]: weaponFacility } = weaponFacilities;
    const { [dragonElement]: dragonFacility } = dragonFacilities;

    return (
      <Paper className="fluid">
        {elementFacility && (
          elementFacility.map((f, i) => (
            <ListItem
              key={element + i}
              facilityType="element"
              index={i}
              facility={f}
              lang={lang}
            />
          ))
        )}

        {weaponFacility && (
          weaponFacility.map((f, i) => (
            <ListItem
              key={type + i}
              facilityType="weapon"
              index={i}
              facility={f}
              lang={lang}
            />
          ))
        )}

        {dragonFacility && (
          dragonFacility.map((f, i) => (
            <ListItem
              key={`dragon_${dragonElement}_${i}`}
              facilityType="dragon"
              index={i}
              facility={f}
              lang={lang}
            />
          ))
        )}
      </Paper>
    );
  }
}


SetHalidom.propTypes = propTypes;
SetHalidom.defaultProps = defaultProps;

const mapStateToProps = ({
  stats: {
    adventurer,
    dragon,
  },
}) => {
  return {
    adventurer,
    dragon,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetFacility: (facilityType) => dispatch(resetFacility(facilityType)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetHalidom));