import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterForm from './FilterForm';
import adventurer from '../../data/adventurer_data';
import weapon from '../../data/weapon_data';
import wyrmprint from '../../data/wyrmprint_data';
import dragon from '../../data/dragon_data';
import SelectItem from './SelectItem';


class SelectionPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      adventurer,
      weapon,
      wyrmprint,
      dragon,
    }
  }

  render() {
    const {
      IMG_PATH, section, filters, filterField,
      handleFilter, handleSelection,
    } = this.props;

    return (
      <div id="right-panel" className="six wide column">
        <FilterForm
          filters={filters}
          filterField={filterField}
          handleFilter={handleFilter}
        />

        <table className="ui celled table">
          <thead>
            <tr>
              <th>{this.capitalise(section)}</th>
              <th>Name</th>
              {filterField.map((field, i) => <th key={i}>{this.capitalise(field)}</th>)}
            </tr>
          </thead>

          <tbody>
            {this.state[section]
              .filter(status => filterField.every(key => status[key].includes(filters[key])))
              .map((status, i) =>
                <SelectItem
                  key={i}
                  status={status}
                  section={section}
                  filterField={filterField}
                  IMG_PATH={IMG_PATH}
                  handleSelection={handleSelection}
                />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    const { section, filters, filterField } = this.props;
    return nextProps.section !== section || nextProps.filters !== filters || nextProps.filterField !== filterField;
  }

  capitalise(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

}

SelectionPanel.propTypes = {
  IMG_PATH: PropTypes.string,
  section: PropTypes.string,
  filters: PropTypes.object,
  filterField: PropTypes.array,
  handleFilter: PropTypes.func,
  handleSelection: PropTypes.func,
};

export default SelectionPanel;