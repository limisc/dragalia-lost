import React, { Component } from 'react';
import StatsList from './StatsList';
import FilterForm from './FilterForm';
import level_dict from '../data/level_data';


const RESET_FILTER = {
  type: "",
  rarity: "",
  element: "",
  tier: "",
}

class StatsSimulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: null,
      sections: ["adventurer", "weapon", "wyrmprint", "dragon"],
      filters: {
        ...RESET_FILTER,
      },
      filterFields: {
        adventurer: ["type", "rarity", "element"],
        weapon: ["type", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["rarity", "element"],
      },
      stats: {
        adventurer: null,
        weapon: null,
        wyrmprint: null,
        dragon: null,
      }
    }

    this.resetFilter = this.resetFilter.bind(this);
    this.handleSection = this.handleSection.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.updateLevel = this.updateLevel.bind(this);
    this.modifyUnbind = this.modifyUnbind.bind(this);
  }

  resetFilter() {
    this.setState({
      filters: { ...RESET_FILTER },
    })
  }

  handleSection(section) {
    const { stats } = this.state;
    let new_filters = { ...RESET_FILTER };

    if (stats["adventurer"]) {
      if (section === "weapon") {
        new_filters.type = stats["adventurer"].type;
      } else if (section === "dragon") {
        new_filters.element = stats["adventurer"].element;
      }
    }

    if (stats["weapon"] && section === "adventurer") {
      new_filters.type = stats["weapon"].type;
    }

    this.setState({
      selectedSection: section,
      filters: new_filters,
      stats: {
        ...stats,
        [section]: null,
      }
    })
  }

  handleFilter(e) {
    this.setState({
      filters: {
        ...this.state.filters,
        [e.target.id]: e.target.value,
      }
    })
  }

  handleSelect(selection) {
    const { selectedSection, filters } = this.state;
    let stats = { ...this.state.stats, [selectedSection]: { ...selection } }

    if (selectedSection === "adventurer") {
      stats.adventurer.mana = level_dict.mana[selection.rarity];
      stats.adventurer.MAX_LEVEL = 80;
      stats.adventurer.level = stats.adventurer.MAX_LEVEL;
      if (stats.weapon && stats.weapon.type !== selection.type) {
        stats.weapon = null;
      }
    } else {
      stats[selectedSection].unbind = 4;
      stats[selectedSection].MAX_LEVEL = level_dict[selectedSection][selection.rarity][4];
      stats[selectedSection].level = stats[selectedSection].MAX_LEVEL;
      if (selectedSection === "weapon" && stats.adventurer && stats.adventurer.type !== selection.type) {
        stats.adventurer = null;
      }
    }
    this.setState({
      stats,
      filters,
    })
  }

  updateLevel(section, level) {
    const { stats } = this.state;
    this.setState({
      stats: {
        ...stats,
        [section]: {
          ...stats[section],
          level,
        }
      }
    });
  }

  modifyUnbind(section, modifier) {
    const { stats } = this.state;
    if (stats[section]) {
      if ((modifier < 0 && stats[section].unbind > 0) || (modifier > 0 && stats[section].unbind < 4)) {
        const unbind = stats[section].unbind + modifier;
        const MAX_LEVEL = level_dict[section][stats[section].rarity][unbind];
        this.setState({
          stats: {
            ...stats,
            [section]: {
              ...stats[section],
              unbind,
              MAX_LEVEL,
              level: MAX_LEVEL,
            }
          }
        });
      }
    }
  }


  render() {
    const { selectedSection, sections, filters, filterFields, stats } = this.state;

    if (stats[selectedSection]) {
      console.log(stats[selectedSection].level)
    }
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div id="left-panel" className="seven wide column">
          <StatsList
            sections={sections}
            stats={stats}
            handleSection={this.handleSection}
            updateLevel={this.updateLevel}
            modifyUnbind={this.modifyUnbind}
          />
        </div>
        {selectedSection &&
          <FilterForm
            selectedSection={selectedSection}
            filters={filters}
            filterFields={filterFields[selectedSection]}
            resetFilter={this.resetFilter}
            handleFilter={this.handleFilter}
            handleSelect={this.handleSelect}
          />
        }
      </div>
    );
  }
}

export default StatsSimulator;