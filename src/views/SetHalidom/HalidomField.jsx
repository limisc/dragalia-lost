// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetField } from "actions";
import { facility } from "data";
import HalidomItem from "./HalidomItem";
const propTypes = {

};

const defaultProps = {

};


class HalidomField extends Component {

  render() {
    const {
      facilities,
      field,
    } = this.props;

    if (facilities) {
      return (
        <Fragment>
          {facilities.list.map((f) => (
            <HalidomItem
              key={f}
              index={f}
              field={field}
              facility={facilities[f]}
            />
          ))}
        </Fragment>
      );
    }

    return null;
  }
}


HalidomField.propTypes = propTypes;
HalidomField.defaultProps = defaultProps;

const mapStateToProps = ({ halidom }) => {
  return {
    // halidom,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetField: (field) => dispatch(resetField(field)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HalidomField);