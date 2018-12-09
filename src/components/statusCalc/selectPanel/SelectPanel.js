import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import adventurer from '../../../redux/store/data/adventurer_data';
import weapon from '../../../redux/store/data/weapon_data';
import wyrmprint from '../../../redux/store/data/wyrmprint_data';
import dragon from '../../../redux/store/data/dragon_data';
import FilterForm from './FilterForm';
import ListItem from './ListItem';

function mapStateToProps(state) {
  const { selectedSection, filters } = state;
  return {
    selectedSection,
    filters,
  };
}

class SelectPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFields: {
        adventurer: ["type", "rarity", "element"],
        weapon: ["type", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["rarity", "element"],
      },
      selectData: {
        adventurer,
        weapon,
        wyrmprint,
        dragon,
      },
      element: ["Flame", "Water", "Wind", "Light", "Shadow"],
    }
  }

  // shouldComponentUpdate(nextProps) {

  // }
  render() {
    // console.log("SelectPanel")

    const {
      props: { selectedSection, filters },
      state: { filterFields: { [selectedSection]: filterField }, selectData: { [selectedSection]: data }, element }
    } = this;


    return (
      <Fragment>
        {selectedSection &&
          <Fragment>
            <FilterForm
              filterField={filterField}
            />

            <table className="ui celled table">
              <thead>
                <tr>
                  <th>{this.capitalise(selectedSection)}</th>
                  <th>Name</th>
                  {filterField.map(field => <th key={uuidv4()}>{this.capitalise(field)}</th>)}
                </tr>
              </thead>

              <tbody>
                {data
                  .filter(item => filterField.every(key => item[key].includes(filters[key])))
                  .sort((item1, item2) => item1.Name.localeCompare(item2.Name))
                  .sort((item1, item2) => element.indexOf(item1.element) - element.indexOf(item2.element))
                  .sort((item1, item2) => item2.tier - item1.tier)
                  .sort((item1, item2) => item2.rarity - item1.rarity)
                  .map(item =>
                    <ListItem
                      key={uuidv4()}
                      section={selectedSection}
                      status={item}
                      filterField={filterField}
                    />
                  )}
              </tbody>
            </table>
          </Fragment>
        }
      </Fragment>
    );
  }

  capitalise(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}

SelectPanel.propTypes = {
  selectedSection: PropTypes.string,
  filters: PropTypes.objectOf(PropTypes.string).isRequired,

}

export default connect(
  mapStateToProps,
)(SelectPanel);