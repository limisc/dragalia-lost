import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SmallIcon from '../../rightPanel/selectStats/SmallIcon';

import { getHalidomValue } from "../../../../redux/actions/actions";
const mapStateToProps = (state) => {
  return {
    halidom: state.halidom,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

class TdItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { field, image, halidom } = this.props;
    const detail = getHalidomValue(halidom[field]);
    return (
      <tr>
        <td><SmallIcon image={image} /></td>
        <td>{detail.HP}</td>
        <td>{detail.STR}</td>
      </tr>
    );
  }
}


TdItem.propTypes = {
  field: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TdItem);