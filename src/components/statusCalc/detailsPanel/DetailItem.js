import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    statusSets: state.statusSets,
  };
}

class DetailItem extends Component {
  render() {
    const { label, section, modifier, statusSets: { [section]: status } } = this.props;
    return (
      <tr>
        <td>{label.charAt(0).toUpperCase() + label.slice(1)}</td>
        <td>{this.calcStats(section, status, "HP", modifier)}</td>
        <td>{this.calcStats(section, status, "STR", modifier)}</td>
      </tr>
    );
  }

  calcStats(section, status, key, modifier) {
    let stats = 0;
    if (status) {
      let level = parseInt(status.level, 10);
      if (!level || level < 1) level = 1;
      let steps, statGain;
      switch (section) {
        case "adventurer": {
          steps = (status["Max" + key] - status["Min" + key + "5"]) / (status.MAX_LEVEL - 1);
          statGain = (level - 1) * steps;
          stats = status["Min" + key + status.curRarity] + statGain + this.getManaBonus(status, key);
          break;
        }
        case "weapon":
        case "wyrmprint":
        case "dragon":
          steps = (status["Max" + key] - status["Min" + key]) / (status.MAX_LEVEL - 1);
          statGain = (level - 1) * steps;
          stats = Math.ceil(status["Min" + key] + statGain) * modifier;
          break;
        default:
          break;
      }
      stats = Math.ceil(stats)
    }
    return stats;
  }

  getManaBonus(status, key) {
    const mana = status.mana.toString();
    const index = ["50", "45", "40", "30", "20", "10", "0"].indexOf(mana);
    const statArray = [
      status["McFullBonus" + key + "5"],
      status["Plus" + key + "4"],
      status["Plus" + key + "3"],
      status["Plus" + key + "2"],
      status["Plus" + key + "1"],
      status["Plus" + key + "0"],
      0,
    ]
    return statArray.slice(index).reduce((acc, cur) => acc + cur);
  }
}


DetailItem.propTypes = {
  //props
  label: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired,
}
export default connect(
  mapStateToProps,
)(DetailItem);