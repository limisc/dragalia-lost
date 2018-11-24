import React, { Component } from 'react';

class FilterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
      rarity: ["3", "4", "5"],
      tier: ["1", "2", "3"],
      // element: ["Flame", "Water", "Wind", "Light", "Shadow"],
    }
  }

  render() {
    const { filters, handleFilter } = this.props;
    return (
      <div className="ui form">
        <div className="four fields">
          {Object.keys(this.state).map((field, i) => (
            <div className="field" key={i}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <select id={field} value={filters[field]} onChange={handleFilter}>
                <option value="">All</option>
                {this.state[field].map((op, j) => (<option key={j} value={op}>{op}</option>))}
              </select>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FilterForm;