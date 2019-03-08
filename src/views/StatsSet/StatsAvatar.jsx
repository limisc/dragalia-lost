/* eslint-disable no-unused-vars */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from "components";

import { selectStatsKey } from "actions";

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectStatsKey: (statsKey) => dispatch(selectStatsKey(statsKey)),
  };
}

class StatsAvatar extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const {
      image,
      label,
      statsKey,
    } = this.props;

    return (
      <Fragment>
        <Image
          size="lg"
          statsKey={statsKey}
          image={image}
          onClick={this.onClick}
        />
        {label}
      </Fragment>
    );
  }

  onClick = () => {
    const { statsKey, selectStatsKey } = this.props;
    selectStatsKey(statsKey);
  }
}


StatsAvatar.propTypes = {
  statsKey: PropTypes.string.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsAvatar);