import React, { memo } from 'react';

const Image = memo(({ field, image, onClick, size = 'md' }) => {
  return (
    <img
      className={size}
      alt={image}
      src={`${process.env.PUBLIC_URL}/images/${field}/${image}.png`}
      onClick={onClick}
    />
  );
});

export default Image;
