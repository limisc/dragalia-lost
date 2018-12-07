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
    updateLevel: (section, key, value, facilityType) => dispatch(updateStatusLevel(section, key, value, facilityType)),
  }
}

class InputItem extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   //because for each statusField, section will not change except change coding layout.
  //   const { section } = this.props;
  //   return nextProps.statusSets[section] !== this.props.statusSets[section];
  // }

  render() {
    const { section, label, statusSets: { [section]: status }, facilityType } = this.props;
    let value = ""
    if (facilityType) {
      value = status[facilityType][label];
    } else if (status) {
      value = status[label];
    }
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
    const { section, label, facilityType, updateLevel } = this.props;
    updateLevel(section, label, e.target.value, facilityType);
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
  facilityType: PropTypes.string,
  statusSets: PropTypes.object.isRequired,
  updateLevel: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputItem);