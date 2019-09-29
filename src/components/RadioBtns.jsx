import React, { Fragment } from 'react';
import { Person, People } from '@material-ui/icons';

const ICONS = {
  build: <Person />,
  team: <People />,
};

const defaultProps = {
  btns: [],
  name: '',
};

function RadioBtns({ btns, checked, name, onChange }) {
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <div className="radio-btns">
      {btns.map(btn => {
        const id = `radio_${btn}`;
        return (
          <Fragment key={id}>
            <input
              type="radio"
              id={id}
              checked={btn === checked}
              name={name}
              value={btn}
              onChange={handleChange}
            />
            <label htmlFor={id}>{ICONS[btn] || btn}</label>
          </Fragment>
        );
      })}
    </div>
  );
}

RadioBtns.defaultProps = defaultProps;

const areEqual = (prevProps, nextProps) => {
  return prevProps.checked === nextProps.checked;
};

export default React.memo(RadioBtns, areEqual);
