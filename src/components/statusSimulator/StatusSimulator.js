import React, { Component } from 'react';
import StatusPanel from './statusPanel/StatusPanel';
import SelectionPanel from './selectionPanel/SelectionPanel';
import LEVEL_LIMIT from '../data/level_data';

const RESET_FILTER = {
  type: "",
  rarity: "",
  element: "",
  tier: "",
}

const RARITY_FIELDS = {
  3: ["5", "4", "3"],
  4: ["5", "4"],
  5: "5",
}

class StatusSimulator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      sections: ["adventurer", "weapon", "wyrmprint", "dragon"],
      filters: RESET_FILTER,
      filterFields: {
        adventurer: ["type", "rarity", "element"],
        weapon: ["type", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["rarity", "element"],
      },
      sets: {
        adventurer: null,
        weapon: null,
        wyrmprint: null,
        dragon: null,
      }
    }

    this.handleSection = this.handleSection.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  render() {
    const {
      selected, sections, filters, filterFields: { [selected]: filterField = null }, sets,
    } = this.state;
    const IMG_PATH = `${process.env.PUBLIC_URL}/img`
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div id="left-panel" className="seven wide column">
          <StatusPanel
            IMG_PATH={IMG_PATH}
            sections={sections}
            sets={sets}
            handleSection={this.handleSection}
            updateStatus={this.updateStatus}
          />
        </div>
        {selected &&
          <SelectionPanel
            IMG_PATH={IMG_PATH}
            section={selected}
            filters={filters}
            filterField={filterField}
            handleFilter={this.handleFilter}
            handleSelection={this.handleSelection}
          />
        }
      </div>
    );
  }

  handleSection(section) {
    const { sets } = this.state;
    let filters = { ...RESET_FILTER };

    if (sets.adventurer) {
      if (section === "weapon") {
        filters.type = sets.adventurer.type;
      } else if (section === "dragon") {
        filters.element = sets.adventurer.element;
      }
    }

    if (sets.weapon && section === "adventurer") {
      filters.type = sets.weapon.type;
    }

    this.setState({
      selected: section,
      filters,
      sets: {
        ...sets,
        [section]: null,
      }
    });
  }

  handleFilter(e) {
    this.setState({
      filters: {
        ...this.state.filters,
        [e.target.id]: e.target.value,
      }
    });
  }

  handleSelection(selection) {
    let { selected, sets } = this.state;
    sets = { ...sets, [selected]: { ...selection } };

    if (selected === "adventurer") {
      const { rarity } = selection;
      sets.adventurer.level = LEVEL_LIMIT.adventurer[rarity];
      sets.adventurer.mana = LEVEL_LIMIT.mana[rarity];
      sets.adventurer.rarityField = RARITY_FIELDS[rarity];
      if (sets.weapon && sets.weapon.type !== selection.type) {
        sets.weapon = null;
      }

    } else {
      sets[selected].level = selection.MAX_LEVEL;
      sets[selected].unbind = 4;

      if (selected === "weapon" && sets.adventurer && sets.adventurer.type !== selection.type) {
        sets.adventurer = null;
      }
    }

    this.setState({
      sets,
    });
  }

  updateStatus(section, status) {
    let modifier = 1;
    if (section === "weapon" || section === "dragon") modifier = 1.5

    let sets = {
      ...this.state.sets,
      [section]: {
        ...status,
        HP: Math.ceil(this.calcStatus(section, status, "Hp") * modifier),
        STR: Math.ceil(this.calcStatus(section, status, "Atk") * modifier),
      }
    }

    console.log(sets[section].HP, sets[section].STR)

    if (sets.dragon) {
      let subtotalHP = 0, subtotalSTR = 0;
      const statusArray = Object.keys(sets), len = statusArray.length;
      for (let i = 0; i < len; ++i) {
        if (sets[statusArray[i]]) {
          subtotalHP = subtotalHP + sets[statusArray[i]].HP;
          subtotalSTR = subtotalSTR + sets[statusArray[i]].STR;
        }
      }
      sets.dragon.abilityHP = this.calcStatus("ability", sets.dragon, "Hp", subtotalHP);
      sets.dragon.abilitySTR = this.calcStatus("ability", sets.dragon, "Atk", subtotalSTR);;
    }

    this.setState({ sets });
  }

  calcSets(sets) {

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
}

export default StatusSimulator;