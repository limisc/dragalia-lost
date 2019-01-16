import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import FilterForm from './FilterForm';
import ListItem from './ListItem';

import adventurer from '../data/adventurer';
import weapon from '../data/weapon';
import wyrmprint from '../data/wyrmprint';
import dragon from '../data/dragon';

import { translate } from "../../../../redux/actions/actions";

const mapStateToProps = (state) => {
  const { language, focusSection, filters } = state;
  return {
    language,
    focusSection,
    filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

class SelectStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFields: {
        adventurer: ["type", "element", "rarity"],
        weapon: ["type", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["element", "rarity"],
      },
      selectData: {
        adventurer,
        weapon,
        wyrmprint,
        dragon,
      },
    }
  }

  render() {
    const { language, focusSection, filters } = this.props;
    const {
      filterFields: { [focusSection]: filterField },
      selectData: { [focusSection]: data },
    } = this.state;

    return (
      <div className="six wide column">
        <FilterForm
          filterField={filterField}
        />
        <table className="ui celled table">
          <thead>
            <tr>
              <th>{translate(focusSection, language)}</th>
              <th>{translate("name", language)}</th>
              {filterField.map(field => <th key={field}>{translate(field, language)}</th>)}
            </tr>
          </thead>

          <tbody>
            {data
              .filter(item => {
                for (const key of filterField) {
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
      </div>
    );
  }

  sortFunction = (item1, item2) => {
    if (item1.rarity > item2.rarity) return -1;
    if (item1.rarity < item2.rarity) return 1;

    if (item1.tier) {
      let tier1 = parseInt(item1.tier, 10), tier2 = parseInt(item2.tier, 10);
      if (tier1 > tier2) return -1;
      if (tier1 < tier2) return 1;
    }

    if (item1.element) {
      const element = ["Flame", "Water", "Wind", "Light", "Shadow"];
      const element1 = element.indexOf(item1.element),
        element2 = element.indexOf(item2.element);
      if (element1 > element2) return 1;
      if (element1 < element2) return -1;
    }

    if (item1.type) {
      const type = ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"];
      const type1 = type.indexOf(item1.type),
        type2 = type.indexOf(item2.type);
      if (type1 > type2) return 1;
      if (type1 < type2) return -1;
    }
    return 0;
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectStats);