import React, { Component } from 'react';
import './Table.css';

class WeaponList extends Component {

  render() {
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
          {this.props.filteredWeapons.map((weapon, i) => (
            <tr key={i}>
              <td>
                <img className={"weapon-img"} src={`/img/weapons/${weapon.BaseId}_01_${weapon.FormId}.png`}
                  alt={weapon.WeaponName}
                />
              </td>
              <td style={{ textAlign: "left" }}>{weapon.WeaponName}</td>
              <td>{weapon.Type}</td>
              <td>{weapon.Rarity}</td>
              <td>{weapon.tier}</td>
              <td><button id={weapon.Id} className="ui button" onClick={this.props.addWeapon}>Add</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default WeaponList;