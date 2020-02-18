import React from 'react';

function Image(props) {
  const { image, name, size, title, onClick } = props;
  const src = `${process.env.PUBLIC_URL}/images/${image}`;

  const picture = (
    <picture className={size}>
      <source type="image/webp" srcSet={`${src}.webp`} />
      <img
        className={size}
        src={`${src}.png`}
        alt={title || image}
        title={title}
      />
    </picture>
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
