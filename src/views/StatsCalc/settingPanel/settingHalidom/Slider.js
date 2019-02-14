import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateHalidom } from "actions";

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateHalidom: (field, index, level) => dispatch(updateHalidom(field, index, level)),
  };
}

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this._onChange = this._onChange.bind(this);
  }

  _onChange = (e) => {
    const { field, index, updateHalidom } = this.props;
    updateHalidom(field, index, e.target.value);
  }

  render() {
    const { level } = this.props;
    return (
      <input
        className="slider"
        type="range"
        min="0" max="30" step="1"
        value={level}
        onChange={this._onChange}
      />
    );
  }
}


Slider.propTypes = {
  field: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Slider);