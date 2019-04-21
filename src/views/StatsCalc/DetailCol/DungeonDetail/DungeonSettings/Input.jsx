// @flow
import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { translate } from 'appRedux/actions';
import { withTheme } from 'components';

class SettingField extends React.PureComponent {
  render() {
    const { label, lang, value, onChange } = this.props;
    return (
      <TextField
        className="col-2"
        type="number"
        variant="filled"
        value={value}
        onChange={onChange}
        label={translate(label, lang)}
        InputProps={{
          name: label,
          onKeyPress: this.handleKeyPress,
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
      />
    );
  }

  handleKeyPress = e => {
    //prevent user enter + - e in number input field.
    if (['+', '-', 'e'].includes(e.key)) {
      e.preventDefault();
    }
  };
}

export default withTheme(SettingField);
