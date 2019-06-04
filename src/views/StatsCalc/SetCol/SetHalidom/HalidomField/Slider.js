import React, { memo } from 'react';

const Slider = memo(({ max, level, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max={max}
      step="1"
      value={level}
      onChange={onChange}
    />
  );
});

export default Slider;
