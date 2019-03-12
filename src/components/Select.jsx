// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import {
  translate,
} from "actions";

const propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  lang: PropTypes.string,
  options: PropTypes.array,
};

const defaultProps = {

};


class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      disabled,
      label,
      lang,
      onChange,
      options,
      value,
    } = this.props;

    const selectOptions = this.buildOptions(options, lang);

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

  buildOptions = (options, lang) => {
    if (Array.isArray(options)
      && (typeof options[0] === "string" || options[0] instanceof String)
    ) {
      return options.map((option) => {
        let label = option;
        if (option === "") {
          label = "All";
        } else if (isNaN(option)) {
          label = translate(option, lang);
        }
        return <MenuItem key={option} value={option}>{label}</MenuItem>;
      });
    }
  }
}

CustomSelect.propTypes = propTypes;
CustomSelect.defaultProps = defaultProps;

export default CustomSelect;