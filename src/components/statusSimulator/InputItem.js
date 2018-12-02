import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputItem extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const { disable, label, value } = this.props;
    return (
      <div className="field">
        <label>{label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}</label>
        <input
          type="number"
          disabled={disable}
          value={value}
          onChange={this._onChange}
        />
      </div>
    );
  }

  _onChange() {
    const { label, value, updateValue } = this.props;
    updateValue(label, value);
  }
}

InputItem.propTypes = {
  key: PropTypes.string,
  updateValue: PropTypes.func,
};

export default InputItem;