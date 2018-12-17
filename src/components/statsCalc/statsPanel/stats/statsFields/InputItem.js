import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { capitalise, updateStats } from '../../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  return {
    stats: state.stats,
    halidom: state.halidom,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStats: (section, key, value, field) => dispatch(updateStats(section, key, value, field)),
  }
}

class InputItem extends Component {
  constructor(props) {
    super(props);
    this._updateStats = this._updateStats.bind(this);
    // // this._updateHalidom = this._updateHalidom.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   //because for each statusField, section will not change except change coding layout.
  //   const { section } = this.props;
  //   return nextProps.statusSets[section] !== this.props.statusSets[section];
  // }

  render() {
    const { section, field, label, stats: { [section]: item } } = this.props;
    let value = "", step = "1";
    if (section === "halidom") {
      value = item[field][label];
      step = "0.5";
    } else if (item) {
      value = item[label];
    }
    return (
      <div className="field">
        {item &&
          <Fragment>
            <label>{capitalise(label)}</label>
            <input
              type="number"
              value={value}
              min="0"
              step={step}
              onChange={this._updateStats}
              onKeyPress={this._handleKeyPress}
            />
          </Fragment>
        }
      </div>
    );
  }

  _updateStats(e) {
    const { section, field, label, updateStats } = this.props;
    updateStats(section, label, e.target.value, field);
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
  stats: PropTypes.object.isRequired,
  // updateLevel: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputItem);