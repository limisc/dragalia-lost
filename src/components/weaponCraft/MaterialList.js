import React, { Component } from 'react';
import weapons from './data/weapon_data';
import materials from './data/material_data';

class MaterialList extends Component {

  constructor(props) {
    super(props);

  }

  shouldComponentUpdate(nextProps) {
    return nextProps.materialRepository !== this.props.materialRepository;
  }


  render() {
    // console.log("MaterialList Re-render");

    const { materialRepository } = this.props;

    // weaponRepository.map(weapon => this.addMaterial(weapon))

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
          {materialRepository.map((material, i) => (
            <tr key={i}>
              <td><img className={"material-img"} src={`/img/materials/${material.Id}.png`}></img></td>
              <td style={{ textAlign: "left" }}>{material.Name}</td>
              <td>{material.Quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            </tr>
          ))

          }
        </tbody>
      </table>
    );
  }
}

export default MaterialList;