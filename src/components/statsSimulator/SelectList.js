import React, { Component } from 'react';
import PropTypes from 'prop-types';
import adventurer from '../data/adventurer_data';
import weapons from '../data/weapon_data';
import wyrmprints from '../data/wyrmprint_data';
import dragons from '../data/dragon_data';

class SelectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adventurer,
      weapon: weapons,
      wyrmprint: wyrmprints,
      dragon: dragons,
    }

  }


  shouldComponentUpdate(nextProps) {
    return nextProps.filters !== this.props.filters || nextProps.selectedSection !== this.props.selectedSection;
  }
  capitalise(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  render() {
    const { selectedSection, filters, filterFields, elements, handleSelect } = this.props;
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>{this.capitalise(selectedSection)}</th>
            <th>Name</th>
            {filterFields.map((field, i) => (<th key={i}>{this.capitalise(field)}</th>))}
          </tr>
        </thead>

        <tbody>
          {this.state[selectedSection]
            .filter(item => filterFields.every(key => item[key].includes(filters[key])))
            .sort((item1, item2) => elements.indexOf(item1.element) - elements.indexOf(item2.element))
            .sort((item1, item2) => item2.tier - item1.tier)
            .sort((item1, item2) => item2.rarity - item1.rarity)
            .map((item, i) => (
              <tr key={i}>
                <td><img
                  className={"selectList-img"}
                  alt={item.Name}
                  src={`${process.env.PUBLIC_URL}/img/${selectedSection}/${item.img}`}
                  onClick={() => handleSelect(item)}
                /></td>
                <td style={{ textAlign: "left" }}>{item.Name}</td>
                {filterFields.map((k, j) => <td key={j}>{item[k]}</td>)}
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

SelectList.propTypes = {
  selectedSection: PropTypes.string,
  filters: PropTypes.object,
  filterFields: PropTypes.array,
  elements: PropTypes.array,
  handleSelect: PropTypes.func,
};

export default SelectList;