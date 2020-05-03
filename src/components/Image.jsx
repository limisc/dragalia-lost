import React from 'react';

function Image(props) {
  const { image, name, size, title, onClick } = props;
  const src = `${process.env.PUBLIC_URL}/images/${image}.png`;

  const picture = (
    <img alt={title || image} className={size} src={src} title={title} />
  );

  if (onClick) {
    const handleClick = e => {
      onClick(e, name);
    };

    return (
      <button type="button" className="image-button" onClick={handleClick}>
        {picture}
      </button>
    );
  }

  return picture;
}

export default Image;
