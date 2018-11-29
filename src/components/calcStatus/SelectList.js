import React, { Component } from 'react';
import adventurers from '../data/adventurer_data';
import weapons from '../data/weapon_data';
import wyrmprints from '../data/wyrmprint_data';
import dragons from '../data/dragon_data';

class SelectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adventurers,
      weapons,
      wyrmprints,
      dragons,
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.filters !== this.props.filters || nextProps.section !== this.props.section;
  }

  capitalise(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  render() {

    const { section, filters, filterFields, handleSelect } = this.props;
    const elements = ["Flame", "Water", "Wind", "Light", "Shadow"];

    console.log("SelectList - Re-render")
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>{this.capitalise(section)}</th>
            <th>Name</th>
            {filterFields.map((field, i) => (<th key={i}>{this.capitalise(field)}</th>))}
          </tr>
        </thead>

        <tbody>
          {this.state[section + "s"]
            .filter(item => Object.keys(filters).every(key => item[key].includes(filters[key])))
            .sort((item1, item2) => elements.indexOf(item1.element) - elements.indexOf(item2.element))
            .sort((item1, item2) => item2.tier - item1.tier)
            .sort((item1, item2) => item2.rarity - item1.rarity)
            .map((item, i) => (
              <tr key={i}>
                <td><img
                  className={"selectList-img"}
                  alt={item.Name}
                  src={`${process.env.PUBLIC_URL}/img/${section}s/${item.img}`}
                  onClick={() => handleSelect(item)}
                /></td>
                <td style={{ textAlign: "left" }}>{item.Name}</td>
                {Object.keys(filters).map((k, j) => <td key={j}>{item[k]}</td>)}
              </tr>
            ))
          }

        </tbody>
      </table >
    );
  }
}

export default SelectList;