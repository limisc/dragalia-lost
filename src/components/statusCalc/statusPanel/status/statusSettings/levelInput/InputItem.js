import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStatusLevel } from '../../../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  const { statusSets } = state;
  return {
    statusSets,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStatusLevel: (section, key, level) => dispatch(updateStatusLevel(section, key, level)),
  }
}

class InputItem extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    let { section, label, statusSets: { [section]: status } } = this.props;
    const disable = status ? false : true;
    const { [label]: value = "" } = status || {};

    return (
      <div className="field">
        <label>{label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}</label>
        <input
          type="number"
          disabled={disable}
          value={value}
          onChange={this._onChange}
        // onKeyPress={this.hanldeKeyPress}
        />
      </div>
    );
  }

  _onChange(e) {
    const { section, label, updateStatusLevel } = this.props;
    updateStatusLevel(section, label, e.target.value);
  }
  // hanldeKeyPress(e) {
  //   //prevent user enter + - e in number input field.
  //   if (["+", "-", "e"].includes(e.key)) {
  //     e.preventDefault();
  //   }
  // }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputItem);