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
  }

  resetFilter() {
    this.setState({
      filters: { ...RESET_FILTER },
    })
  }

  handleSection(section) {
    const { filters, stats } = this.state;
    let new_filters = { ...RESET_FILTER };
    if (stats[section] === null) {
      new_filters.type = filters.type;
      new_filters.element = filters.element;
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
    let { selectedSection, filters, stats } = this.state;
    stats = {
      ...stats,
      [selectedSection]: {
        ...selection,
        level: level_dict[selectedSection][selection.rarity].MAX_LEVEL,
      }
    }

    switch (selectedSection) {
      case "adventurer":
        stats[selectedSection].mana = level_dict.mana[selection.rarity];
        filters = { ...filters, type: selection.type, element: selection.element };
        break;
      case "weapon":
        stats[selectedSection].unbind = 4;
        filters = { ...filters, type: selection.type };
        break;
      default:
        stats[selectedSection].unbind = 4;
    }

    this.setState({
      stats,
      filters,
    })
  }

  render() {
    const { selectedSection, sections, filters, filterFields, stats } = this.state;
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div id="left-panel" className="seven wide column">
          <StatsList
            sections={sections}
            stats={stats}
            handleSection={this.handleSection}
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