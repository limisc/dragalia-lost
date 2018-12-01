import React, { Component } from 'react';
import StatusPanel from './statusPanel/StatusPanel';
import SelectionPanel from './selectionPanel/SelectionPanel';

const RESET_FILTER = {
  type: "",
  rarity: "",
  element: "",
  tier: "",
}

const MANA_DICT = { "3": 30, "4": 40, "5": 50 };

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
            updateStatus={this.updateStatus}
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

    if (sets.weapon && section === "adventure") {
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
      sets[selected].level = selection.LEVEL_LIMIT[selection.rarity];
      sets[selected].mana = MANA_DICT[selection.rarity];

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
    this.setState({
      sets:{
        ...this.state.sets,
        [section]:{
          ...status,
        }
      }
    });
  }
}

export default StatusSimulator;