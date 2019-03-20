// @flow

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from "components";
import {
  selectFocus,
  translate,
} from "actions";

const propTypes = {
  image: PropTypes.string,
  lang: PropTypes.string,
  name: PropTypes.objectOf(PropTypes.string),
  statsKey: PropTypes.string.isRequired,
};

class StatsAvatar extends PureComponent {

  render() {
    let {
      image,
      lang,
      name,
      statsKey,
    } = this.props;

    const label = !!name ? name[lang] : translate(statsKey, lang);

    return (
      <Fragment>
        <Image
          size="lg"
          image={image}
          statsKey={statsKey}
          onClick={this.onClick}
        />
        <span className="caption">
          {label}
        </span>
      </Fragment>
    );
  }

  onClick = () => {
    const {
      selectFocus,
      statsKey,
    } = this.props;
    selectFocus(statsKey);
  }
}

StatsAvatar.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => {
  return {
    selectFocus: (statsKey) => dispatch(selectFocus(statsKey)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(StatsAvatar);