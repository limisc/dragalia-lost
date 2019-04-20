//@flow
import React from 'react';

class Slider extends React.PureComponent {
  render() {
    const { max, level, onChange } = this.props;

    return (
      <input
        className="slider"
        type="range"
        min="0"
        max={max}
        step="1"
        value={level}
        onChange={onChange}
      />
    );
  }
}

export default Slider;
