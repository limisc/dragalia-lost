/* eslint-disable no-console */
import React from 'react';
import uuid from 'uuid/v4';
import { ClearRounded, SettingsApplicationsRounded } from '@material-ui/icons';
import { translate } from 'utils';
import { Context } from './ContextProvider';
import Image from './Image';

const defaultProps = {
  checked: false,
  disabled: false,
  icon: true,
  title: null,
};

const ICONS = {
  disable: <ClearRounded />,
  setting: <SettingsApplicationsRounded />,
};

function Checkbox({
  checked,
  disabled,
  icon,
  id,
  name,
  label,
  title,
  onChange,
  setChecked,
}) {
  const { lang } = React.useContext(Context);
  const newId = React.useMemo(() => id || uuid(), [id]);

  const handleChange = e => {
    if (setChecked) {
      setChecked(e.target.checked);
    } else if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <input
        className="check-box"
        type="checkbox"
        id={newId}
        checked={checked}
        disabled={disabled}
        name={name}
        value={label}
        onChange={handleChange}
      />
      <label htmlFor={newId} title={translate(title || label, lang)}>
        {icon ? (
          <Image size="xs" field="icon" image={`${name}_${label}`} />
        ) : (
          ICONS[label] || label
        )}
      </label>
    </>
  );
}

Checkbox.defaultProps = defaultProps;

export default React.memo(Checkbox);
