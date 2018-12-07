import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatusLevel } from '../../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  const { statusSets } = state;
  return {
    statusSets,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLevel: (section, key, value) => dispatch(updateStatusLevel(section, key, value)),
  }
}

class InputItem extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    //because for each statusField, section will not change except change coding layout.
    const { section } = this.props;
    return nextProps.statusSets[section] !== this.props.statusSets[section];
  }

  render() {
    const { section, label, statusSets: { [section]: status } } = this.props;
    const { [label]: value = "" } = status || {};
    console.log(section, label, value)
    return (
      <div className="field">
        <label>{label.charAt(0).toUpperCase() + label.slice(1)}</label>
        <input
          type="number"
          disabled={!status}
          value={value}
          onChange={this._onChange}
          onKeyPress={this._handleKeyPress}
        />
      </div>
    );
  }

  _onChange(e) {
    const { section, label, updateLevel } = this.props;
    updateLevel(section, label, e.target.value);
  }

  _handleKeyPress(e) {
    //prevent user enter + - e in number input field.
    if (["+", "-", "e"].includes(e.key)) {
      e.preventDefault();
    }
  }
}

InputItem.propTypes = {
  section: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  statusSets: PropTypes.object.isRequired,
  updateLevel: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputItem);