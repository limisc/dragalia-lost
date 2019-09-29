import React from 'react';
import Checkbox from './Checkbox';

const defaultProps = {
  btns: [],
  disabled: false,
};

function CheckBtns({ btns, disabled, name, onChange, setChecked }) {
  const handleChange = e => {
    if (setChecked) {
      const { checked, value } = e.target;
      setChecked(prev => {
        return prev.map(item =>
          item.label === value ? { ...item, checked } : item
        );
      });
    } else if (onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      {btns.map(({ label, checked }) => {
        const id = `check_${label}`;
        return (
          <Checkbox
            key={id}
            checked={checked}
            disabled={disabled}
            id={id}
            name={name}
            label={label}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
}

CheckBtns.defaultProps = defaultProps;

export default React.memo(CheckBtns);
