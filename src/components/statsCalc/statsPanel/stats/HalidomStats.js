import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFacilityValue } from '../../../../redux/actions/actions';
const mapStateToProps = (state) => {
  const { stats: { adventurer, dragon }, halidom } = state;
  return {
    adventurer,
    dragon,
    halidom
  };
}

class HalidomStats extends Component {
  render() {
    const { field, adventurer, dragon, halidom } = this.props;
    const type = field === "fafnir" ? dragon.element : adventurer[field];
    const { HP, STR } = getFacilityValue(halidom[field]);
    return (
      <tr>
        <td>
          <img
            className="s"
            alt={`${field}_${type}.png`}
            src={`${process.env.PUBLIC_URL}/image/icon/${field}_${type}.png`}
          />
        </td>
        <td>{HP}</td>
        <td>{STR}</td>
      </tr>
    );
  }

}

HalidomStats.propTypes = {
  field: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
)(HalidomStats);