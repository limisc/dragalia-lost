import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
      element: ["Flame", "Water", "Wind", "Light", "Shadow"],
      rarity: ["5", "4", "3"],
      tier: ["3", "2", "1"],
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.filters !== this.props.filters || nextProps.filterField !== this.props.filterField;
  }

  render() {
    const {
      filters, filterField,
      handleFilter,
    } = this.props;


    return (
      <div className="ui form">
        <div className="four fields">

          {filterField.map((field, i) =>
            <div className="field" key={i}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <select id={field} value={filters[field]} onChange={handleFilter}>
                <option value="">All</option>
                {this.state[field].map((opt, j) => (<option key={j} value={opt}>{opt}</option>))}
              </select>
            </div>
          )}
        </div>
      </div>
    );
  }
}

FilterForm.propTypes = {
  filters: PropTypes.object,
  filterField: PropTypes.array,
  handleFilter: PropTypes.func,
};

export default FilterForm;