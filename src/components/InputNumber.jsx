//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { TextField } from '@material-ui/core';
import { translate } from 'appRedux/actions';
import withTheme from './ThemeContext/withTheme';

class InputNumber extends React.PureComponent {
  render() {
    const { lang, label, value, disabled, onChange } = this.props;

    return (
      <TextField
        className="col-2"
        type="number"
        variant="filled"
        value={value}
        disabled={disabled}
        label={translate(label, lang)}
        onChange={onChange}
        inputProps={{
          name: label,
          onKeyPress: this.handleKeyPress,
        }}
      />
    );
  }

  handleKeyPress = e => {
    //prevent user enter + - e in number input field.
    if (['+', '-', 'e', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };
}

export default withTheme(InputNumber);
