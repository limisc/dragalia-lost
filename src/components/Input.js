/* eslint-disable no-unused-vars */
import React, { memo, useContext } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { translate } from 'actions';
import Context from './Context';

const Input = memo(
  ({ classes, label, value, adornment, disabled, onChange }) => {
    const { lang } = useContext(Context);

    const handleKeyPress = e => {
      //prevent user enter + - e in number input field.
      if (['+', '-', 'e', '.'].indexOf(e.key) !== -1) {
        e.preventDefault();
      }
    };

    return (
      <TextField
        type="number"
        variant="filled"
        label={translate(label, lang)}
        value={value}
        className={classes}
        disabled={disabled}
        onChange={onChange}
        InputProps={{
          name: label,
          onKeyPress: handleKeyPress,
          endAdornment: adornment && (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ),
        }}
      />
    );
  }
);

export default Input;
