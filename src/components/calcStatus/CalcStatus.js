import React, { Component } from 'react';
import FilterForm from './FilterForm';
import SelectList from './SelectList';
import StatusBoard from './statusBoard/StatusBoard';


const initFilters = {
  type: "",
  rarity: "",
  element: "",
  tier: "",
}

const LEVEL_DICT = {
  adventurer: {
    "3": {
      MAX_LEVEL: 60,
    },
    "4": {
      MAX_LEVEL: 70,
    },
    "5": {
      MAX_LEVEL: 80,
    }
  },
  weapon: {
    "3": {
      UB_LEVEL_0: 20,
      UB_LEVEL_1: 25,
      UB_LEVEL_2: 30,
      UB_LEVEL_3: 35,
      MAX_LEVEL: 40,
    },
    "4": {
      UB_LEVEL_0: 50,
      UB_LEVEL_1: 55,
      UB_LEVEL_2: 60,
      UB_LEVEL_3: 65,
      MAX_LEVEL: 70,
    },
    "5": {
      UB_LEVEL_0: 80,
      UB_LEVEL_1: 85,
      UB_LEVEL_2: 90,
      UB_LEVEL_3: 95,
      MAX_LEVEL: 100,
    }
  },
  wyrmprint: {
    "3": {
      UB_LEVEL_0: 20,
      UB_LEVEL_1: 30,
      UB_LEVEL_2: 40,
      UB_LEVEL_3: 50,
      MAX_LEVEL: 60,
    },
    "4": {
      UB_LEVEL_0: 30,
      UB_LEVEL_1: 40,
      UB_LEVEL_2: 50,
      UB_LEVEL_3: 65,
      MAX_LEVEL: 80,
    },
    "5": {
      UB_LEVEL_0: 40,
      UB_LEVEL_1: 55,
      UB_LEVEL_2: 70,
      UB_LEVEL_3: 85,
      MAX_LEVEL: 100,
    }
  },
  dragon: {
    "3": {
      UB_LEVEL_0: 20,
      UB_LEVEL_1: 30,
      UB_LEVEL_2: 40,
      UB_LEVEL_3: 50,
      MAX_LEVEL: 60,
    },
    "4": {
      UB_LEVEL_0: 30,
      UB_LEVEL_1: 40,
      UB_LEVEL_2: 50,
      UB_LEVEL_3: 65,
      MAX_LEVEL: 80,
    },
    "5": {
      UB_LEVEL_0: 40,
      UB_LEVEL_1: 55,
      UB_LEVEL_2: 70,
      UB_LEVEL_3: 85,
      MAX_LEVEL: 100,
    }
  },
  mana: {
    "3": 30,
    "4": 40,
    "5": 50,
  }
}

class CalcStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      sections: ['adventurer', 'weapon', 'wyrmprint', 'dragon'],
      filters: { ...initFilters },
      filterFields: {
        adventurer: ["type", "rarity", "element"],
        weapon: ["type", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["rarity", "element"],
      },
      filterOptions: {
        type: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
        element: ["Flame", "Water", "Wind", "Light", "Shadow"],
        rarity: ["5", "4", "3"],
        tier: ["3", "2", "1"],
      },
      status: {
        adventurer: null,
        weapon: null,
        wyrmprint: null,
        facility: null,
        status: null,
      }

    }

    this.handleSection = this.handleSection.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.modifyUnbind = this.modifyUnbind.bind(this);
  }

  resetFilter() {
    this.setState({
      filters: { ...initFilters }
    })
  }

  handleSection(active) {
    let { filters, sections, status } = this.state;
    const section = sections[active];
    filters = {
      ...initFilters,
      type: filters.type,
      element: filters.element,
    }

    if (status[section]) {
      status = {
        ...status,
        [section]: null,
      };
      filters = {
        ...initFilters
      }
    }

    this.setState({
      active,
      filters,
      status,
    });
  }

  handleFilter(e) {
    this.setState({
      filters: {
        ...this.state.filters,
        [e.target.id]: e.target.value,
      }
    })
  }

  handleSelect(item) {
    let { active, sections, filters, status } = this.state;
    const section = sections[active];
    status = {
      ...status,
      [section]: {
        ...item,
        level: LEVEL_DICT[section][item.rarity].MAX_LEVEL,
      }
    }

    switch (section) {
      case "adventurer":
        status[section].mana = LEVEL_DICT.mana[item.rarity];
        filters = { ...filters, type: item.type, element: item.element };
        break;
      case "weapon":
        filters = { ...filters, type: item.type };
        status[section].unbind = 4;
        break;
      default:
        status[section].unbind = 4;
    }

    this.setState({
      status,
      filters,
    })
  }

  modifyUnbind(active, modifier) {
    let { sections, status } = this.state;
    const section = sections[active];

    this.setState({
      status: {
        ...status,
        [section]: {
          ...section,
          unbind: status[section].unbind + modifier,
        }
      }
    })
  }

  render() {

    const {
      active,
      sections,
      status,
      filters,
      filterFields,
      filterOptions,
    } = this.state;

    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div id="left-panel" className="nine wide column">
          {/* <div className="ui divider"></div> */}

          <StatusBoard
            sections={sections}
            status={status}
            handleSection={this.handleSection}
            modifyUnbind={this.modifyUnbind}
          />
        </div>

        <div id="right-panel" className="six wide column">
          {active !== null &&
            <div>
              <FilterForm
                filters={filters}
                filterFields={filterFields[sections[active]]}
                filterOptions={filterOptions}
                handleFilter={this.handleFilter}
              />

              <SelectList
                section={sections[active]}
                filters={
                  Object.keys(filters)
                    .filter(key => filterFields[sections[active]].includes(key))
                    .reduce((obj, key) => {
                      return { ...obj, [key]: filters[key] }
                    }, {})
                }
                filterFields={filterFields[sections[active]]}
                handleSelect={this.handleSelect}
              />
            </div>
          }

        </div>
      </div >
    );
  }
}

export default CalcStatus;