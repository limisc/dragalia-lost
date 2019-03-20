// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { translate } from "actions";

const propTypes = {
  label: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

class SettingField extends React.PureComponent {
  render() {
    const {
      label,
      lang,
      value,
      disabled,
      onChange,
    } = this.props;
    return (
      <TextField
        className="item-field"
        disabled={disabled}
        label={translate(label, lang)}
        value={value}
        onChange={onChange}
        type="number"
        InputProps={{
          name: label,
          onKeyPress: this.handleKeyPress,
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        variant="filled"
      />
    );
  }

  handleKeyPress = (e) => {
    //prevent user enter + - e in number input field.
    if (["+", "-", "e"].includes(e.key)) {
      e.preventDefault();
    }
  }
}

SettingField.propTypes = propTypes;

export default SettingField;