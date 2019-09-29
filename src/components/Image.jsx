import React from 'react';

const defaultProps = {
  id: null,
  size: 'md',
  tabIndex: '0',
};

function Image({ field, id, image, size, tabIndex, onClick }) {
  const src = `${process.env.PUBLIC_URL}/images/${field}/${image}.png`;

  if (onClick) {
    return (
      <input
        id={id}
        alt={image}
        className={size}
        src={src}
        type="image"
        tabIndex={tabIndex}
        onClick={onClick}
      />
    );
  }

  return <img id={id} className={size} alt={image} src={src} />;
}

Image.defaultProps = defaultProps;

export default React.memo(Image);
