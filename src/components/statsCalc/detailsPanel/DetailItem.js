import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { capitalise } from '../../../redux/actions/actions';
function mapStateToProps(state) {
  return {
    details: state.details,
  };
}

class DetailItem extends Component {
  render() {
    const { label, details: { [label]: field } } = this.props;
    const { HP = 0, STR = 0 } = field || {};
    return (
      <tr>
        <td>{capitalise(label)}</td>
        <td>{HP}</td>
        <td>{STR}</td>
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