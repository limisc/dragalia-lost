import React from 'react';
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { translate } from 'actions';
import Context from './Context';

class SimpleSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    const { lang, options } = props;
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

    this.state = { selectOptions };
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

const withLang = Component => {
  return props => (
    <Context.Consumer>
      {({ lang }) => <Component key={lang} lang={lang} {...props} />}
    </Context.Consumer>
  );
};

export default withLang(SimpleSelect);
