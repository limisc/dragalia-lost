/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getSection } from "actions";
class Image extends PureComponent {

  render() {
    const {
      size,
      image,
      statsKey,
      onClick
    } = this.props;

    const section = getSection(statsKey);

    return (
      <img
        className={size}
        alt={image}
        src={`${process.env.PUBLIC_URL}/image/${section}/${image}`}
        onClick={onClick}
      />
    );
  }
}


Image.propTypes = {
  statsKey: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default Image;