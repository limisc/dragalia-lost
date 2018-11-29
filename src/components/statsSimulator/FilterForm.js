import React, { Component } from 'react';
import SelectList from './SelectList';
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
    return nextProps.filters !== this.props.filters || nextProps.filterFields !== this.props.filterFields;
  }


  render() {
    const { selectedSection, filters, filterFields, resetFilter, handleFilter, handleSelect } = this.props;

    return (
      <div id="right-panel" className="six wide column">
        <div className="ui form">
          <div className="four fields">
            {filterFields.map((field, i) => (
              <div className="field" key={i}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <select id={field} value={filters[field]} onChange={handleFilter}>
                  <option value="">All</option>
                  {this.state[field].map((opt, j) => (<option key={j} value={opt}>{opt}</option>))}
                </select>
              </div>
            ))}
            <div className="field">
              <button className="ui button" style={{ marginTop: "23px", marginLeft: "25px" }} onClick={resetFilter}>Clear</button>
            </div>
          </div>
        </div>

        <SelectList
          selectedSection={selectedSection}
          filters={filters}
          filterFields={filterFields}
          elements={this.state.element}
          handleSelect={handleSelect}
        />
      </div>
    );
  }
}

FilterForm.propTypes = {
  selectedSection: PropTypes.string,
  filters: PropTypes.object,
  filterFields: PropTypes.array,
  resetFilter: PropTypes.func,
  hanldeFilter: PropTypes.func,
  handleSelect: PropTypes.func,
};

export default FilterForm;