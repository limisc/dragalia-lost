import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AppContext } from "context";
import { translate, updateStats } from "actions";
import { Select } from "components";
const mapStateToProps = (state, props) => {
  const { section } = props;
  return {
    item: state.stats[section]
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStats: (section, key, value) => dispatch(updateStats(section, key, value)),
  };
}

class SelectItem extends Component {
  state = {
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

  _getOptions = (label, item) => {
    if (item) {
      if (label === "EX" || label === "unbind") {
        return this.state.unbind;
      } else if (label === "curRarity") {
        return this.state[label][item.rarity];
      } else if (label === "mana") {
        return this.state[label][item.curRarity];
      }
    } else {
      return [];
    }
  }

  _onChange = (e) => {
    const { label, section, updateStats } = this.props;
    updateStats(section, label, e.target.value);
  }

  render() {
    const { lang } = this.context;
    const { label, item } = this.props;
    const options = this._getOptions(label, item);
    let value = "", disabled = true;
    if (item) {
      value = item[label];
      if (label !== "curRarity" || item.rarity !== "5") {
        disabled = false;
      }
    }
    return (

      <Select
        disabled={disabled}
        label={translate(label, lang)}
        options={options}
        value={value}
        onChange={this._onChange}
      />
    );
  }
}
SelectItem.contextType = AppContext;

SelectItem.propTypes = {
  label: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectItem);