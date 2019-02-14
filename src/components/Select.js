/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from '@material-ui/core';

import { AppContext } from "context";
import { buildOptions, translate } from "actions";
class CustomSelect extends Component {
  // state = {
  //   labelWidth: 0,
  // }
  // componentDidMount() {
  //   const { label } = this.props;
  //   if (label) {
  //     this.setState({
  //       labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
  //     });
  //   }
  // }

  _buildOptions = (lang) => {
    const { built, options } = this.props;

    if (built) {
      return options.map(option => (
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
      ));
    } else {
      return buildOptions(options, lang);
    }
  }


  render() {
    const {
      disabled,
      value,
      label,
      onChange,
    } = this.props;
    const { lang } = this.context;
    const options = this._buildOptions(lang);
    const labelWidth = label ? 100 : 0;
    return (
      <FormControl
        className="fluid"
        variant="outlined"
        disabled={disabled}
      >
        {label &&
          <InputLabel
          // ref={ref => {
          //   this.InputLabelRef = ref;
          // }}
          >
            {translate(label, lang)}
          </InputLabel>
        }
        <Select
          value={value}
          onChange={onChange}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
            />
          }
          inputProps={{
            name: label
          }}
        >
          {options}
        </Select>
      </FormControl>

    );
  }
}

CustomSelect.contextType = AppContext;

CustomSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
}

export default CustomSelect;