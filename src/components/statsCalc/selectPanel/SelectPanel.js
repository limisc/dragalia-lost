import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StatsSelection from './statsSelection/StatsSelection';
import HalidomSelection from './halidomSelection/HalidomSelection';

const mapStateToProps = (state) => {
  return {
    focusSection: state.focusSection
  };
}

class SelectPanel extends Component {
  render() {
    const { focusSection } = this.props;

    if (focusSection === "halidom") {
      return <HalidomSelection />
    } else if (focusSection) {
      return <StatsSelection />
    } else {
      return null;
    }
  }
}

SelectPanel.propTypes = {
  //redux
  focusSection: PropTypes.string,
}

export default connect(
  mapStateToProps,
)(SelectPanel);