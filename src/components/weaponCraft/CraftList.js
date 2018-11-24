import React, { Component } from 'react';

class CraftList extends Component {
  render() {
    const { weaponRepository, clearRepository, removeWeapon, unbindIncrement, unbindDecrement } = this.props;
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th><button className="ui button" onClick={clearRepository}>Clear</button></th>
            <th>Name</th>
            <th>Unbind</th>
          </tr>
        </thead>
        <tbody>
          {weaponRepository.map((weapon, index) => {
            // console.log(typeof i)
            return (
              <tr key={index}>
                <td>
                  <img className={"weapon-img"} src={`/img/weapons/${weapon.BaseId}_01_${weapon.FormId}.png`}
                    alt={weapon.WeaponName}
                    style={{ width: "50px", height: "50px" }}
                    onClick={e => removeWeapon(index)}
                  />
                </td>
                <td style={{ textAlign: "left" }}>{weapon.WeaponName}</td>
                <td>
                  <div className="unbind set">
                    <img src={`/img/unbind/left-icon.png`} alt={"left-icon"} onClick={e => unbindDecrement(index)} />
                    <img src={`/img/unbind/${weapon.Unbind}_Unbind.png`} alt={"unbind_image"} />
                    <img src={`/img/unbind/right-icon.png`} alt={"right-icon"} onClick={e => unbindIncrement(index)} />
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