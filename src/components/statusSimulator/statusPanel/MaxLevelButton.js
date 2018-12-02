import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MaxLevelButton extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    return (
      <button className="ui button" disabled={this.props.disable} style={{ marginTop: "24px" }} onClick={this._onClick}>MAX LEVEL</button>
    );
  }

  _onClick() {
    this.props.updateValue("max");
  }
}

MaxLevelButton.propTypes = {
  disable: PropTypes.bool,
  updateValue: PropTypes.func,
};

export default MaxLevelButton;