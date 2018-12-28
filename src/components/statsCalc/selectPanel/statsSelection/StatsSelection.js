import React, { Component, Fragment } from 'react';

import FilterForm from './FilterForm';
import ListItem from './ListItem';

import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import ui_content from '../../../../redux/store/data/ui_content';
import adventurer from '../../../../redux/store/data/adventurer_data';
import weapon from '../../../../redux/store/data/weapon_data';
import wyrmprint from '../../../../redux/store/data/wyrmprint_data';
import dragon from '../../../../redux/store/data/dragon_data';

const mapStateToProps = (state) => {
  const { language, focusSection, filters } = state;
  return {
    language,
    focusSection,
    filters,
  };
}

class StatsSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFields: {
        adventurer: ["weaponType", "rarity", "element"],
        weapon: ["weaponType", "rarity", "tier"],
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
      weaponType: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
    }

  }

  render() {
    const { language, focusSection, filters } = this.props;
    const {
      filterFields: { [focusSection]: filterField },
      selectData: { [focusSection]: data },
    } = this.state;

    return (
      <Fragment>
        <FilterForm
          filterField={filterField}
        />
        <table className="ui celled table">
          <thead>
            <tr>
              <th>{ui_content[focusSection][language]}</th>
              <th>{ui_content.name[language]}</th>
              {filterField.map(field => <th key={uuidv4()}>{ui_content[field][language]}</th>)}
            </tr>
          </thead>

          <tbody>
            {data
              .filter(item => {
                for (let key of filterField) {
                  if (!item[key].includes(filters[key])) return false;
                }
                return true;
              })
              .sort((item1, item2) => this.sortFunction(item1, item2))
              .map(item =>
                <ListItem
                  key={uuidv4()}
                  section={focusSection}
                  item={item}
                  filterField={filterField}
                />
              )}
          </tbody>
        </table>
      </Fragment>
    );
  }

  sortFunction(item1, item2) {
    if (item1.rarity > item2.rarity) return -1;
    if (item1.rarity < item2.rarity) return 1;

    if (item1.tier) {
      let tier1 = parseInt(item1.tier, 10), tier2 = parseInt(item2.tier, 10);
      if (tier1 > tier2) return -1;
      if (tier1 < tier2) return 1;
    }

    if (item1.element) {
      const element1 = this.state.element.indexOf(item1.element),
        element2 = this.state.element.indexOf(item2.element);
      if (element1 > element2) return 1;
      if (element1 < element2) return -1;
    }

    if (item1.weaponType) {
      const weaponType1 = this.state.weaponType.indexOf(item1.weaponType),
        weaponType2 = this.state.weaponType.indexOf(item2.weaponType);
      if (weaponType1 > weaponType2) return 1;
      if (weaponType1 < weaponType2) return -1;
    }

    if (item1.Name.en > item2.Name.en) return 1;
    if (item1.Name.en < item2.Name.en) return -1;

    return 0;
  }
}

export default connect(
  mapStateToProps,
)(StatsSelection);