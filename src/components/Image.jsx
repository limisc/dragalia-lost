// @flow
import React from 'react';

class Image extends React.PureComponent {
  render() {
    const { dir, image, onClick, size = 'md' } = this.props;
    return (
      <img
        className={size}
        alt={image}
        src={`${process.env.PUBLIC_URL}/images/${dir}/${image}.png`}
        onClick={onClick}
      />
    );
  }
}

export default Image;
