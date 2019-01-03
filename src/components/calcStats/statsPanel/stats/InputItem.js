import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { translate, updateStats } from "../../../../redux/actions/actions";

const mapStateToProps = (state) => {
  const { language, stats } = state;
  return {
    language,
    stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStats: (section, key, value) => dispatch(updateStats(section, key, value)),
  };
}

class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const { language, section, label, stats: { [section]: item } } = this.props;
    return (
      <div className="field">
        {item &&
          <Fragment>
            <label>{translate(label, language)}</label>
            <input
              type="number"
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
    const { section, label, updateStats } = this.props;
    updateStats(section, label, e.target.value);
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputItem);