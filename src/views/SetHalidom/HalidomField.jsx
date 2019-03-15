// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetField } from "actions";
import { facility } from "data";
import ListItem from "./ListItem";
const propTypes = {

};

const defaultProps = {

};


class HalidomField extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    const {
      field,
      resetField,
    } = props;
    resetField(field);
  }
  render() {
    const {
      field,
      fieldType,
    } = this.props;

    const list = facility[field][fieldType];
    if (list) {
      return (
        <Fragment>
          {list.map((f, i) => (
            <ListItem
              key={i}
              index={i}
              field={field}
              facility={f}

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

const mapStateToProps = (state) => {
  return {

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