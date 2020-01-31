import React, { useRef } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { getOutBGC } from 'utils';
import locales from 'locales';
import Image from './Image';

function Checkbox(props) {
  const {
    checked,
    disabled,
    group,
    icon,
    lang,
    title: titleProp,
    value,
    theme,
    onChange,
    setChecked,
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
    <div className="checkbox" style={getOutBGC(theme)}>
      <input
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
          <Image image={image} title={title} />
        </label>
      ) : (
        <label htmlFor={id}>{title}</label>
      )}
    </div>
  );
}

const mapStateToProps = ({ theme }) => {
  return { theme };
};

export default connect(mapStateToProps)(Checkbox);
