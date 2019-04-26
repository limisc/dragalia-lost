import React from 'react';
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { translate } from 'actions';
import withTheme from './withTheme';

const getOptions = (options, lang) => {
  return options.map(opt => {
    let label = opt;
    if (opt === '') {
      label = 'ALL';
    } else if (isNaN(opt)) {
      label = translate(opt, lang);
    }

    return (
      <MenuItem key={opt} value={opt}>
        {label}
      </MenuItem>
    );
  });
};

class SimpleSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    const { lang, options } = props;
    const selectOptions = getOptions(options, lang);
    this.state = { lang, options, selectOptions };
  }

  static getDerivedStateFromProps(props, state) {
    const { lang, options } = props;
    if (lang !== state.lang || options !== state.options) {
      const selectOptions = getOptions(options, lang);
      return {
        lang,
        options,
        selectOptions,
      };
    }

    return null;
  }

  render() {
    const { classes, disabled, label, lang, onChange, value } = this.props;

    return (
      <FormControl variant="filled" className={classes} disabled={disabled}>
        <InputLabel>{translate(label, lang)}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          input={<FilledInput name={label} />}
        >
          {this.state.selectOptions}
        </Select>
      </FormControl>
    );
  }
}

export default withTheme(SimpleSelect);
