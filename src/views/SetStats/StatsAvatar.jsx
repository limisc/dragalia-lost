// @flow
/* eslint-disable no-unused-vars */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from "components";
import { Typography } from '@material-ui/core';
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

const defaultProps = {

};


class StatsAvatar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

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
          size={"lg"}
          image={image}
          statsKey={statsKey}
          onClick={this.onClick}
        />
        <Typography noWrap>
          {label}
        </Typography>
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
StatsAvatar.defaultProps = defaultProps;

const mapDispatchToProps = (dispatch) => {
  return {
    selectFocus: (statsKey) => dispatch(selectFocus(statsKey)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(StatsAvatar);