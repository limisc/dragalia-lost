import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailItem from './DetailItem';
import uuidv4 from 'uuid/v4';

function mapStateToProps(state) {
  return {
    stats: state.stats,
  };
}

class DetailsPanel extends Component {
  render() {
    // const { stats } = this.props;
    return (
      <table className="ui orange celled table">
        <thead>
          <tr>
            <th>Field</th>
            <th>HP</th>
            <th>STR</th>
            {/* <th>Diff</th> */}
          </tr>
        </thead>

        <tbody>
          {["adventurer", "weapon", "wyrmprint", "dragon", "ability", "facility", "total"].map(field => {
            return (
              <DetailItem
                key={uuidv4()}
                label={field}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
  // calcStatus(section, status, key, subtotal) {
  //   let stats = 0;
  //   let { level, rarity, unbind } = status;
  //   let step, statGain;
  //   level = (level === "" || parseInt(level, 10) === 0) ? 1 : parseInt(level, 10);
  //   switch (section) {
  //     case "adventurer":
  //       step = (status["Max" + key] - status["Min" + key + "5"]) / (status.MAX_LEVEL - 1);
  //       statGain = (level - 1) * step;
  //       stats = Math.ceil(status["Min" + key + rarity] + statGain) + this.getManaBonus(status, key);
  //       break;
  //     case "weapon":
  //     case "dragon":
  //     case "wyrmprint":
  //       step = (status["Max" + key] - status["Min" + key]) / (status.MAX_LEVEL - 1);
  //       statGain = (level - 1) * step;
  //       stats = Math.ceil(status["Min" + key] + statGain);
  //       break;
  //     case "ability":
  //       const abilityName = parseInt(unbind, 10) === 4 ? "Abilities12" : "Abilities11";
  //       const { attr, value } = status[abilityName];

  //       if ((attr === "both") || (attr === "Strength" && key === "Atk") || (attr === "HP" && key === "Hp")) {
  //         stats = Math.ceil(subtotal * value / 100);
  //         console.log(stats)
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   return stats;
  // }
}
export default connect(
  mapStateToProps,
)(DetailsPanel);