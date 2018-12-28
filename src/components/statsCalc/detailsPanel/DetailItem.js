import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ui_content from '../../../redux/store/data/ui_content';

function mapStateToProps(state) {
  return {
    language: state.language,
    details: state.details,
  };
}

class DetailItem extends Component {
  render() {
    const { language, label, details: { [label]: field } } = this.props;
    const { HP = 0, STR = 0 } = field || {};
    return (
      <tr>
        <td>{ui_content[label][language]}</td>
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