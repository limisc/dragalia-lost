import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { translate } from 'utils';
import { Context } from './ContextProvider';

const defaultProps = {
  adornment: false,
  disabled: false,
  type: 'int',
};

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {Function} props.onChange
 * @param {string} [props.adornment]
 * @param {boolean} [props.disabled]
 * @param {string} [props.type]
 */
function Input({ adornment, disabled, label, type, value, onChange }) {
  const { lang } = React.useContext(Context);
  const l = React.useMemo(() => translate(label, lang), [label, lang]);

  const handleKeyPress = e => {
    if (type !== 'int' && type !== 'float') return;
    // prevent user enter + - e in number input field.
    // TODO use Regex
    let arr;
    if (type === 'int') {
      arr = ['+', '-', 'e', '.'];
    } else if (type === 'float') {
      arr = ['+', '-', 'e'];
    }

    if (arr.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <TextField
      type="number"
      variant="filled"
      label={l}
      value={value}
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

Input.defaultProps = defaultProps;

export default React.memo(Input);
