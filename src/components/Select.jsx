// @flow
import React from 'react';
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { translate } from 'appRedux/actions';
import withTheme from './ThemeContext/withTheme';

class CustomSelect extends React.PureComponent {
  render() {
    const { disabled, label, lang, onChange, options, value } = this.props;
    const selectOptions = this.buildOptions(options, lang);
    return (
      <FormControl className="fluid" variant="filled" disabled={disabled}>
        <InputLabel>{translate(label, lang)}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          input={<FilledInput name={label} />}
        >
          {selectOptions}
        </Select>
      </FormControl>
    );
  }

  // TODO memo buildOptions
  buildOptions = (options, lang) => {
    if (
      Array.isArray(options) &&
      (typeof options[0] === 'string' || options[0] instanceof String)
    ) {
      return options.map(option => {
        let label = option;
        if (option === '') {
          label = 'All';
        } else if (isNaN(option)) {
          label = translate(option, lang);
        }

        return (
          <MenuItem key={option} value={option}>
            {label}
          </MenuItem>
        );
      });
    }
  };
}

export default withTheme(CustomSelect);
