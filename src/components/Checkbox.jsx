import React, { memo, useRef } from 'react';
import uuid from 'uuid/v1';
import locales from 'locales';
import Image from './Image';

const Checkbox = memo(function Checkbox(props) {
  const {
    checked,
    disabled,
    group,
    icon,
    lang,
    onChange,
    setChecked,
    title: titleProp,
    value,
  } = props;

  const title = locales(titleProp || value, lang);

  const { current: id } = useRef(
    group && value ? `check_${group}_${value}` : uuid()
  );

  const { current: image } = useRef(
    group ? `icon/${group}_${value}` : `icon/${value}`
  );

  const handleChange = e => {
    if (onChange) {
      onChange(e);
    } else if (setChecked) {
      setChecked(e.target.checked);
    }
  };

  return (
    <>
      <input
        className="checkbox"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        id={id}
        name={group}
        value={value}
        onChange={handleChange}
      />
      {icon ? (
        <label htmlFor={id} className="icon" title={title}>
          <Image image={image} />
        </label>
      ) : (
        <label htmlFor={id}>{title}</label>
      )}
    </>
  );
});

export default Checkbox;
