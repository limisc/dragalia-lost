// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { getSection } from "actions";

const propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  image: PropTypes.string.isRequired,
  statsKey: PropTypes.string.isRequired,
};

const defaultProps = {
  size: "md",
  image: "add",
};

class Image extends React.PureComponent {

  render() {
    const {
      size,
      image,
      statsKey,
      onClick,
    } = this.props;

    const section = getSection(statsKey);
    return (
      <img
        className={size}
        alt={image}
        src={`${process.env.PUBLIC_URL}/image/${section}/${image}.png`}
        onClick={onClick}
      />
    );
  }
}


Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;