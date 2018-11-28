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

class CalcStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      sections: ['adventurer', 'weapon', 'wyrmprint', 'dragon'],
      filters: initFilters,
      filterFields: {
        adventurer: ["type", "rarity", "element"],
        weapon: ["type", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["rarity", "element"],
      },
      filterOptions: {
        type: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
        element: ["Flame", "Water", "Wind", "Light", "Shadow"],
        rarity: ["3", "4", "5"],
        tier: ["1", "2", "3"],
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
  }

  resetFilter() {
    this.setState({
      filters: initFilters
    })
  }


  handleSection(active) {
    this.setState({
      active,
      filters: {
        ...initFilters,
        type: this.state.filters.type,
      }
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
    const { active, sections, status } = this.state;
    this.setState({
      status: {
        ...status,
        [sections[active]]: {
          ...item,
          level: 1,
          mana: 0,
        },
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

    if (active !== null) {

      console.log(status[sections[active]])
    }
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div id="left-panel" className="five wide column">
          {/* <div className="ui divider"></div> */}

          <StatusBoard
            sections={sections}
            status={status}
            handleSection={this.handleSection}
          />
        </div>

        <div id="right-panel" className="five wide column">
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