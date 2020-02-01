import React from 'react';
import { connect } from 'react-redux';
import { getInputBGC } from 'utils';

function Input(props) {
  const {
    type = 'number',
    name,
    placeholder,
    step = 1,
    spellCheck,
    theme,
    value,
    onChange,
  } = props;

  return (
    <input
      style={getInputBGC(theme)}
      type={type}
      name={name}
      step={step}
      spellCheck={spellCheck}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

const mapStateToProps = ({ theme }) => {
  return { theme };
};

export default connect(mapStateToProps)(Input);
