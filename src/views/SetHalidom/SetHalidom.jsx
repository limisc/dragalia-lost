// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { facility } from "data";
import HalidomField from "./HalidomField";


const propTypes = {

};

const defaultProps = {

};


class SetHalidom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: undefined,
      weapon: undefined,
      dragon: undefined,
    };
  }

  render() {
    const {
      adventurer,
      dragon,
    } = this.props;

    const { element, type } = adventurer || {};
    const { element: dragonElement } = dragon || {};
    return (
      <Paper className="fluid">
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


SetHalidom.propTypes = propTypes;
SetHalidom.defaultProps = defaultProps;

const mapStateToProps = ({ stats: { adventurer, dragon }, halidom }) => {
  return {
    adventurer,
    dragon,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //: () => dispatch(),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetHalidom);