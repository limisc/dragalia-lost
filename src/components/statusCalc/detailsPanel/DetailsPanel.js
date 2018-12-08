import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailItem from './DetailItem';
import uuidv4 from 'uuid/v4';

function mapStateToProps(state) {
  return {
    statusSets: state.statusSets,
  };
}

class DetailsPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { statusSets } = this.props;
    const { adventurer, dragon } = statusSets;
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
            const section = field === "ability" ? "dragon" : field;
            let modifier = 1;

            if (field === "ability" && adventurer && dragon) {
              if (adventurer.element !== dragon.element) {
                modifier = 0;
              }
            }

            if (["weapon", "dragon"].includes(field) && adventurer && statusSets[field]) {
              if (adventurer.element === statusSets[field].element) {
                modifier = 1.5;
              }
            }
            return (
              <DetailItem
                key={uuidv4()}
                label={field}
                section={section}
                modifier={modifier}
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

function getStats(statusSets) {
  let stats = {};
  ["adventurer", "weapon", "wyrmprint", "dragon"].map(section => {
    stats[section] = {
      HP: calcStats(section, statusSets[section], "HP"),
      STR: calcStats(section, statusSets[section], "STR"),
    }
  })
  return stats;
}

function calcStats(section, status, key) {
  let stats = 0;
  if (status) {
    let { level, curRarity } = status;

    level = parseInt(level, 10);
    if (level || level < 1) level = 1;
    const minValue = section === "adventurer" ? status["Min" + key + "5"] : status["Min" + key];
    const step = (status["Max" + key] - minValue) / (status.MAX_LEVEL - 1);
    const statGain = (level - 1) * step;
    const startValue = section === "adventurer" ? status["Min" + key + curRarity] : status["Min" + key];
    stats = Math.ceil(startValue + statGain);
    if (section === "adventurer") stats = stats + getManaBonus(status, key);
  }
  return stats;

  // /case "ability":
  //   const abilityName = parseInt(unbind, 10) === 4 ? "Abilities12" : "Abilities11";
  //   const { attr, value } = status[abilityName];

  //   if ((attr === "both") || (attr === "Strength" && key === "Atk") || (attr === "HP" && key === "Hp")) {
  //     stats = Math.ceil(subtotal * value / 100);
  //     console.log(stats)
  //   }
  //   break;

}

function getManaBonus(status, key) {
  const mana = status.mana.toString();
  const index = ["50", "45", "40", "30", "20", "10", "0"].indexOf(mana);
  if (index !== -1) {
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
  return "";
}

export default connect(
  mapStateToProps,
)(DetailsPanel);