import React, { Component } from 'react';
import FilterForm from './FilterForm';
import WeaponList from './WeaponList';
import CraftList from './CraftList';
import MaterialList from './MaterialList'
import weapons from '../data/weapon_data';
import materials from '../data/material_data';
import './Table.css';

const initFilters = {
  type: "",
  rarity: "",
  tier: "",
};

class WeaponCraft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "Craft",
      filters: initFilters,
      enhanceFrom: null,
      enhanceTo: null,
      weaponRepository: [],
      materialRepository: materials,
    };

    this.changeMode = this.changeMode.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.handleEnhance = this.handleEnhance.bind(this);

    this.addWeaponToRepository = this.addWeaponToRepository.bind(this);
    this.removeWeaponFromRepository = this.removeWeaponFromRepository.bind(this);
    this.clearRepository = this.clearRepository.bind(this);

    this.unbindIncrement = this.unbindIncrement.bind(this);
    this.unbindDecrement = this.unbindDecrement.bind(this);
  }

  // componentWillMount() {
  //   // weapons.forEach(weapon => {
  //   //   weapon.tier = Math.floor(weapon.CraftNodeId / 100).toString();
  //   //   weapon.AssembleCoin = parseInt(weapon.AssembleCoin);
  //   //   weapon.CraftMaterialQuantity1 = parseInt(weapon.CraftMaterialQuantity1);
  //   //   weapon.CraftMaterialQuantity2 = parseInt(weapon.CraftMaterialQuantity2);
  //   //   weapon.CraftMaterialQuantity3 = parseInt(weapon.CraftMaterialQuantity3);
  //   //   weapon.CraftMaterialQuantity4 = parseInt(weapon.CraftMaterialQuantity4);
  //   //   weapon.CraftMaterialQuantity5 = parseInt(weapon.CraftMaterialQuantity5);
  //   // });

  //   materials.forEach(material => {
  //     material.Quantity = 0;
  //   })
  // }

  filterWeapon = (weaponAttr, filterValue) => {
    return weaponAttr.toLowerCase().includes(filterValue.toLowerCase());
  }

  changeMode = (e) => {
    this.setState({ active: e.target.id });
  }

  handleFilter(e) {
    this.setState({
      filters: {
        ...this.state.filters,
        [e.target.id]: e.target.value,
      }
    });
  }

  handleEnhance(weapon) {
    if (this.state.enhanceFrom === null) {
      this.setState({
        enhanceFrom: {
          ...weapon,
          Unbind: 0,
        }
      })
    } else {
      if (!((weapon.Tier === this.state.enhanceFrom.Tier) && (this.state.enhanceFrom.Unbind !== 4))) {
        let unbind = 0;
        if (weapon.Tier === this.state.enhanceFrom.Tier) {
          unbind = this.state.enhanceFrom.Unbind + 1;
        }
        this.setState({
          enhanceTo: {
            ...weapon,
            Unbind: unbind,
          }
        })
      }
    }
  }

  clearFilter = () => {
    this.setState({ filters: initFilters });
  }

  ModeButton = (id) => {
    const btnColor = id === this.state.active ? "ui violet button" : "ui button";
    return (<button id={id} className={btnColor} style={{ width: "50%" }} onClick={this.changeMode}>{id}</button>);
  }

  addWeaponToRepository(weapon) {
    this.setState({
      weaponRepository: [
        ...this.state.weaponRepository,
        {
          ...weapon,
          Unbind: 0,
        }
      ],
      materialRepository: this.updateMaterialRepository(weapon, 1),
    });
  }

  removeWeaponFromRepository(index) {
    const { weaponRepository } = this.state;
    this.setState({
      weaponRepository: [
        ...weaponRepository.slice(0, index),
        ...weaponRepository.slice(index + 1),
      ],
      materialRepository: this.updateMaterialRepository(weaponRepository[index], -1 * (weaponRepository[index].Unbind + 1)),
    })
  }

  clearRepository() {
    this.setState({
      weaponRepository: [],
      materialRepository: materials,
    });
  }

  unbindIncrement(index) {
    const { weaponRepository } = this.state;
    if (weaponRepository[index].Unbind < 4) {
      this.setState({
        weaponRepository: [
          ...weaponRepository.slice(0, index),
          {
            ...weaponRepository[index],
            Unbind: weaponRepository[index].Unbind + 1
          },
          ...weaponRepository.slice(index + 1)
        ],
        materialRepository: this.updateMaterialRepository(weaponRepository[index], 1),
      });
    }
  }

  unbindDecrement(index) {
    const { weaponRepository } = this.state;
    if (weaponRepository[index].Unbind > 0) {
      this.setState({
        weaponRepository: [
          ...weaponRepository.slice(0, index),
          {
            ...weaponRepository[index],
            Unbind: weaponRepository[index].Unbind - 1
          },
          ...weaponRepository.slice(index + 1)
        ],
        materialRepository: this.updateMaterialRepository(weaponRepository[index], -1),
      });
    }
  }

  findParentWeapon(childWeapon) {
    const parentWeapon = weapons
      .filter(weapon => weapon.CraftGroupId === childWeapon.CraftGroupId)
      .filter(weapon => weapon.CraftNodeId === childWeapon.ParentCraftNodeId);
    if (parentWeapon !== null || parentWeapon.length > 0) {
      return parentWeapon[0];
    }
  }

  requiredMaterials(weapon, quantity) {
    let craftList = [weapon];
    const repository = {};

    while (weapon.Tier > 1) {
      weapon = this.findParentWeapon(weapon);
      craftList = [...craftList, weapon];
    }

    craftList.forEach(weapon => {
      repository.Rupies = (repository.Rupies || 0) + parseInt(weapon.AssembleCoin) * quantity;
      for (let j = 1; j <= 5; j++) {
        const materialName = "CraftMaterial" + j;
        const materialQuantity = "CraftMaterialQuantity" + j;
        if (weapon[materialName] === "0") { break; }
        repository[weapon[materialName]] = (repository[weapon[materialName]] || 0) + parseInt(weapon[materialQuantity]) * quantity;
      }
      quantity = quantity * 5;
    });
    // console.log(repository)
    return repository;
  }

  updateMaterialRepository(weapon, quantity) {
    const { materialRepository } = this.state;
    const repository = this.requiredMaterials(weapon, quantity);

    return materialRepository.map(material => {
      if (material.Name in repository) {
        return {
          ...material,
          Quantity: (material.Quantity || 0) + repository[material.Name],
        };
      }
      return material;
    });
  }

  render() {
    const { active, filters, enhanceFrom, weaponRepository, materialRepository } = this.state;
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div id="weapon-panel" className="column">
          Weapon
          <div className="ui divider"></div>

          <div className="row">
            <div className="ui buttons" style={{ width: "60%" }}>
              {this.ModeButton("Craft")}
              <div className="or"></div>
              {this.ModeButton("Enhance")}
            </div>
            <button className="ui right floated button" onClick={this.clearFilter}>Clear Filter</button>
          </div>
          <div className="ui divider"></div>

          <FilterForm
            filters={filters}
            handleFilter={this.handleFilter}
          />

          <div className="ui divider"></div>
          <WeaponList
            mode={active}
            filters={filters}
            enhanceFrom={enhanceFrom}
            addWeapon={this.addWeaponToRepository}
            handleEnhance={this.handleEnhance}
          />
        </div>

        <div id="result-panel" className="column">
          <CraftList
            weaponRepository={weaponRepository}
            clearRepository={this.clearRepository}
            removeWeapon={this.removeWeaponFromRepository}
            unbindIncrement={this.unbindIncrement}
            unbindDecrement={this.unbindDecrement}
          />

          {/* {this.state.weaponRepository.length !== 0 && */}
          <MaterialList
            // weaponRepository={weaponRepository}
            materialRepository={
              materialRepository.filter(material => material.Quantity > 0)
            }
          />
        </div>
      </div >
    );
  }
};

export default WeaponCraft;