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
import ThemeContext from './Theme/context';

const withTheme = Component => {
  return props => (
    <ThemeContext.Consumer>
      {contexts => <Component key={contexts.lang} {...props} {...contexts} />}
    </ThemeContext.Consumer>
  );
};

class SimpleSelect extends React.PureComponent {
  state = {
    selectOptions: [],
  };

  componentDidMount() {
    const { lang, options } = this.props;
    const selectOptions = options.map(opt => {
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

    this.setState({ selectOptions });
  }

  render() {
    const { disabled, label, lang, onChange, value } = this.props;

    return (
      <FormControl className="fluid" variant="filled" disabled={disabled}>
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
