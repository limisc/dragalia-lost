// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from "components";
import { translate } from "actions";
const propTypes = {

};

const defaultProps = {

};


class StatsAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  render() {
    let {
      image,
      name,
      statsKey,
    } = this.props;


    const label = name ? name["en"] : statsKey;

    return (
      <Fragment>
        <Image
          size={"lg"}
          image={image}
          statsKey={statsKey}
          onClick={this.onClick}
        />
        {label}
      </Fragment>
    );
  }

  onClick = () => {

  }
}


StatsAvatar.propTypes = propTypes;
StatsAvatar.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //: () => dispatch(),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsAvatar);