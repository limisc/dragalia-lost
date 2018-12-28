import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStats } from '../../../../../redux/actions/actions';
import ui_content from '../../../../../redux/store/data/ui_content';

const mapStateToProps = (state) => {
  const { language, stats, halidom } = state;
  return {
    language,
    stats,
    halidom,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (section, key, value) => dispatch(updateStats(section, key, value)),
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
    const { language, section, label, stats: { [section]: item } } = this.props;
    // const value = item ? item[label] : "";

    return (
      <div className="field">
        {item &&
          <Fragment>
            <label>{ui_content[label][language]}</label>
            <input
              type="number"
              min="1"
              value={item[label]}
              onChange={this._onChange}
              onKeyPress={this._handleKeyPress}
            />
          </Fragment>
        }
      </div>
    );
  }

  _onChange(e) {
    const { section, label, onChange } = this.props;
    onChange(section, label, e.target.value);
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