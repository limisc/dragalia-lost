import React, { Component } from 'react';
import weapons from './data/weapon_data';


class WeaponList extends Component {

  componentWillMount() {
    weapons.map(weapon => weapon.Tier = Math.floor(weapon.CraftNodeId / 100).toString());
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.filters !== this.props.filters;
  }

  filterWeapon = (weaponAttr, filterValue) => {
    return weaponAttr.toLowerCase().includes(filterValue.toLowerCase());
  }

  render() {
    const { type, rarity, tier } = this.props.filters;
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Rarity</th>
            <th>Tier</th>
            <th>Craft</th>
          </tr>
        </thead>

        <tbody>
          {weapons
            .filter(weapon => this.filterWeapon(weapon.Type, type))
            .filter(weapon => this.filterWeapon(weapon.Rarity, rarity))
            .filter(weapon => this.filterWeapon(weapon.Tier, tier))
            .sort((weapon1, weapon2) => weapon2.Rarity - weapon1.Rarity)
            .map((weapon, i) => (
              <tr key={i}>
                <td>
                  <img className={"weapon-img"} src={`/img/weapons/${weapon.BaseId}_01_${weapon.FormId}.png`}
                    alt={weapon.WeaponName}
                  />
                </td>
                <td style={{ textAlign: "left" }}>{weapon.WeaponName}</td>
                <td>{weapon.Type}</td>
                <td>{weapon.Rarity}</td>
                <td>{weapon.Tier}</td>
                <td><button className="ui button" onClick={e => this.props.addWeapon(weapon)}>Add</button></td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

export default WeaponList;