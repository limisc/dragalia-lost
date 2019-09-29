import React from 'react';
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { translate } from 'utils';
import { Context } from './ContextProvider';

const defaultProps = {
  disabled: false,
  label: '',
  options: null,
  value: '',
};

function CustomSelect({ disabled, label, options, value, onChange }) {
  const { lang } = React.useContext(Context);

  const selectOptions = React.useMemo(() => {
    if (!Array.isArray(options)) return null;

    return options.map(opt => {
      let text = opt;
      if (opt === '') {
        text = 'ALL';
      } else if (!/^\d+&/.test(opt)) {
        text = translate(opt, lang);
      }

      return (
        <MenuItem key={opt} value={opt}>
          {text}
        </MenuItem>
      );
    });
  }, [options, lang]);

  return (
    <FormControl variant="filled" disabled={disabled || !options}>
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

CustomSelect.defaultProps = defaultProps;

export default React.memo(CustomSelect);
