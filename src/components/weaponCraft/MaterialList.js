import React, { Component } from 'react';
import weapons from './data/weapon_data';
import materials from './data/material_data';


class MaterialList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      materialRepository: [],
    }
  }

  calMaterial = () => {
    const { weaponRepository } = this.props;

  }

  findParentWeapon = (parentCraftNodeId, craftGroupId) => {
    const parentWeapon = weapons.filter(weapon => weapon.CraftNodeId === parentCraftNodeId).filter(weapon => weapon.CraftGroupId === craftGroupId)
    return parentWeapon[0] || null;
  }


  render() {
    const { weaponRepository } = this.props;
    const weapon = weapons.find(weapon => weapon.Id = weaponRepository[0].id);

    const parentWeapon = weapons.find(w => w.CraftNodeId = weapon.ParentCraftNodeId && w.CraftGroupId === weapon.CraftGroupId);
    // console.log(weapon)

    // console.log(parentWeapon);
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>Material</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>{weaponRepository[weaponRepository.length - 1].id}</td>
            <td>{weaponRepository[weaponRepository.length - 1].unbind}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MaterialList;