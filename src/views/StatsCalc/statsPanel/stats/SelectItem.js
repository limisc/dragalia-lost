import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { translate, updateStats } from "actions";

const mapStateToProps = (state) => {
  return {
    language: state.language,
    stats: state.stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStats: (section, key, value) => dispatch(updateStats(section, key, value)),
  };
}

class SelectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mana: {
        5: ["50", "45", "40", "30", "20", "10", "0"],
        4: ["40", "30", "20", "10", "0"],
        3: ["30", "20", "10", "0"],
      },
      curRarity: {
        5: ["5"],
        4: ["5", "4"],
        3: ["5", "4", "3"],
      },
      unbind: ["4", "3", "2", "1", "0"],
    }
    this._onChange = this._onChange.bind(this);
  }

  getOptions = (options, label, item) => {
    switch (label) {
      case "unbind":
        return options;
      case "curRarity":
        return options[item.rarity];
      case "mana":
        return options[item.curRarity];
      default:
        return [];
    }
  }

  _onChange = (e) => {
    const { label, section, updateStats } = this.props;
    updateStats(section, label, e.target.value);
  }

  render() {
    const { language, label, section, stats: { [section]: item } } = this.props;
    return (
      <div className="field">
        {item &&
          <Fragment>
            <label>{translate(label, language)}</label>

            <select id={label}
              value={item[label]} onChange={this._onChange}
            >
              {this.getOptions(this.state[label], label, item).map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </Fragment>
        }
      </div>
    );
  }
}


SelectItem.propTypes = {
  label: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectItem);