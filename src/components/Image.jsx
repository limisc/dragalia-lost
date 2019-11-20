import React, { memo } from 'react';

const Image = memo(function Image(props) {
  const { image, size, title, tabIndex, onClick } = props;

  const src = `${process.env.PUBLIC_URL}/images/${image}.png`;

  if (onClick) {
    return (
      <input
        alt={image}
        className={size}
        src={src}
        type="image"
        tabIndex={tabIndex}
        onClick={onClick}
      />
    );
  }

  return <img className={size} alt={image} src={src} title={title} />;
});

export default Image;
