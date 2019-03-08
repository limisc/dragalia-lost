/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  FilledInput
} from '@material-ui/core';

import { AppContext } from "context";
import {
  buildOptions,
  translate,
} from "actions";


const propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
};

class CustomSelect extends Component {

  render() {
    const {
      disabled,
      label,
      onChange,
      options,
      value,
    } = this.props;

    const { lang } = this.context;

    const selectOptions = buildOptions(options, lang);

    return (
      <FormControl
        className="fluid"
        variant="filled"
        disabled={disabled}
      >
        <InputLabel>{translate(label, lang)}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          input={
            <FilledInput
              name={label}
            />
          }
        >
          {selectOptions}
        </Select>
      </FormControl>
    );
  }
}

CustomSelect.contextType = AppContext;

CustomSelect.propTypes = propTypes;

export default CustomSelect;