import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    stats: state.stats,
  };
}

class DetailItem extends Component {
  render() {
    const { label, stats } = this.props;
    return (
      <tr>
        <td>{label.charAt(0).toUpperCase() + label.slice(1)}</td>
        <td>{stats[label].HP}</td>
        <td>{stats[label].STR}</td>
      </tr>
    );
  }
}


DetailItem.propTypes = {
  //props
  label: PropTypes.string.isRequired,
}
export default connect(
  mapStateToProps,
)(DetailItem);