import React, { memo, useContext, useMemo } from 'react';
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { translate } from 'actions';
import Context from './Context';

const CustomSelect = memo(
  ({ classes, disabled, label, value, options, onChange }) => {
    const { lang } = useContext(Context);

    const selectOptions = useMemo(() => {
      return Array.isArray(options)
        ? options.map(opt => {
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
          })
        : undefined;
    }, [options, lang]);

    return (
      <FormControl
        variant="filled"
        className={classes}
        disabled={!options || disabled}
      >
        <InputLabel>{translate(label, lang)}</InputLabel>
        <Select
          value={value || ''}
          onChange={onChange}
          input={<FilledInput name={label} />}
        >
          {selectOptions}
        </Select>
      </FormControl>
    );
  }
);

export default CustomSelect;
