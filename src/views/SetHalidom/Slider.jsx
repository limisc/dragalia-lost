// @flow
/* eslint-disable no-unused-vars */
import React from 'react';

const Slider = ({ level, max, onChange }) => {
  return (
    <input
      className="slider"
      type="range"
      min="0" max={max} step="1"
      value={level}
      onChange={onChange}
    />
  );
}

export default Slider;