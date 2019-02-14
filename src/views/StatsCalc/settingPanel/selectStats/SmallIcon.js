import React, { PureComponent } from 'react';

class SmallIcon extends PureComponent {
  render() {
    const { image } = this.props;
    return (
      <img
        className="s"
        alt={image}
        src={`${process.env.PUBLIC_URL}/image/icon/${image}`}
      />
    );
  }
}

export default SmallIcon;