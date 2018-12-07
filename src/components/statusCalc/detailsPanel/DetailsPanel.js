import React, { Component } from 'react';

class DetailsPanel extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }

  getManaBonus(status, key) {
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


  calcStatus(section, status, key, subtotal) {
    let stats = 0;
    let { level, rarity, unbind } = status;
    let step, statGain;
    level = (level === "" || parseInt(level, 10) === 0) ? 1 : parseInt(level, 10);
    switch (section) {
      case "adventurer":
        step = (status["Max" + key] - status["Min" + key + "5"]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * step;
        stats = Math.ceil(status["Min" + key + rarity] + statGain) + this.getManaBonus(status, key);
        break;
      case "weapon":
      case "dragon":
      case "wyrmprint":
        step = (status["Max" + key] - status["Min" + key]) / (status.MAX_LEVEL - 1);
        statGain = (level - 1) * step;
        stats = Math.ceil(status["Min" + key] + statGain);
        break;
      case "ability":
        const abilityName = parseInt(unbind, 10) === 4 ? "Abilities12" : "Abilities11";
        const { attr, value } = status[abilityName];

        if ((attr === "both") || (attr === "Strength" && key === "Atk") || (attr === "HP" && key === "Hp")) {
          stats = Math.ceil(subtotal * value / 100);
          console.log(stats)
        }
        break;
      default:
        break;
    }
    return stats;
  }
}

export default DetailsPanel;