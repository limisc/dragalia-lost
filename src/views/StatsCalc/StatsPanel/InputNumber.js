/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Paper,
  TextField
} from '@material-ui/core';

import { AppContext } from "context";
import { translate, updateStats } from "actions";

const mapStateToProps = (state) => {
  const { stats } = state;
  return {
    stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStats: (section, key, value) => dispatch(updateStats(section, key, value)),
  };
}

class InputNumber extends Component {
  _onChange = (e) => {
    const { section, label, updateStats } = this.props;
    updateStats(section, label, e.target.value);
  }

  _handleKeyPress = (e) => {
    //prevent user enter + - e in number input field.
    if (["+", "-", "e", "."].includes(e.key)) {
      e.preventDefault();
    }
  }

  render() {
    const { lang } = this.context;
    const { section, label, stats: { [section]: item } } = this.props;
    let value = "", disabled = true;
    if (item) {
      value = item[label];
      disabled = false;
    }
    return (
      <TextField
        disabled={disabled}
        label={translate(label, lang)}
        value={value}
        variant="outlined"
        inputProps={{
          // name: label,
          type: "number",
          onKeyPress: this._handleKeyPress,
        }}
        onChange={this._onChange}
      />
    );
  }
}

InputNumber.contextType = AppContext;

InputNumber.propTypes = {
  section: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputNumber);
/*
 <>
        {item &&
          <Fragment>
            <label>{translate(label, language)}</label>
            <input
              type="number"
              value={item[label]}
              onChange={this._onChange}
              onKeyPress={this._handleKeyPress}
            />
          </Fragment>
        }
      </>
*/