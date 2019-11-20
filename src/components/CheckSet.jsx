import React from 'react';
import { useEvent } from 'utils';
import Checkbox from './Checkbox';

function CheckSet({
  disabled,
  icon,
  lang,
  group,
  options,
  onChange = () => {},
}) {
  const handleChange = useEvent(e => {
    onChange(e);
  });

  if (options == null) return null;

  return (
    <div>
      {options.map(({ checked, value }) => {
        return (
          <Checkbox
            key={value}
            checked={checked}
            disabled={disabled}
            icon={icon}
            lang={lang}
            group={group}
            value={value}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
}

export default CheckSet;
