import React, { Component } from 'react';
import weapons from './data/weapon_data';

class CraftList extends Component {
  render() {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th><button className="ui button" onClick={this.props.clearRepository}>Clear</button></th>
            <th>Name</th>
            <th>Unbind</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weaponRepository.map((item, i) => {
            const weapon = weapons.find(weapon => weapon.Id === item.id);
            return (
              <tr key={i}>
                <td>
                  <img id={i} className={"weapon-img"} src={`/img/weapons/${weapon.BaseId}_01_${weapon.FormId}.png`}
                    alt={weapon.WeaponName}
                    style={{ width: "50px", height: "50px" }}
                    onClick={this.props.removeWeapon}
                  />
                </td>
                <td style={{ textAlign: "left" }}>{weapon.WeaponName}</td>
                <td>
                  <div className="unbind set">
                    <img id={i} src={`/img/unbind/left-icon.png`} alt={"left-icon"} onClick={this.props.descUnbind}/>
                    <img src={`/img/unbind/${item.unbind}_Unbind.png`} alt={"unbind_image"} />
                    <img id={i} src={`/img/unbind/right-icon.png`} alt={"right-icon"} onClick={this.props.incUnbind} />
                  </div>
                </td>
              </tr>
            )
          })}

        </tbody>
      </table>
    );
  }
}

export default CraftList;