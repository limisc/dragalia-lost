import React, { Component } from 'react';
import FilterForm from './FilterForm';
import WeaponList from './WeaponList';
import CraftList from './CraftList';
import MaterialList from './MaterialList'
import weapons from './data/weapon_data';

const initFilter = {
  type: "",
  rarity: "",
  tier: "",
};

class WeaponCraft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "Craft",
      weaponRepository: [],
      ...initFilter,
    };

    this.changeMode = this.changeMode.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);

    this.addWeaponToRepository = this.addWeaponToRepository.bind(this);
    this.removeWeaponFromRepository = this.removeWeaponFromRepository.bind(this);
    this.clearRepository = this.clearRepository.bind(this);

    this.incUnbind = this.incUnbind.bind(this);
    this.descUnbind = this.descUnbind.bind(this);
  }

  componentWillMount() {
    weapons.forEach(weapon => {
      weapon.tier = Math.floor(weapon.CraftNodeId / 100).toString();
      weapon.AssembleCoin = parseInt(weapon.AssembleCoin);
      weapon.CraftMaterialQuantity1 = parseInt(weapon.CraftMaterialQuantity1);
      weapon.CraftMaterialQuantity2 = parseInt(weapon.CraftMaterialQuantity2);
      weapon.CraftMaterialQuantity3 = parseInt(weapon.CraftMaterialQuantity3);
      weapon.CraftMaterialQuantity4 = parseInt(weapon.CraftMaterialQuantity4);
      weapon.CraftMaterialQuantity5 = parseInt(weapon.CraftMaterialQuantity5);
    })
  }

  filterWeapon = (arg1, arg2) => {
    return arg1.toLowerCase().includes(arg2.toLowerCase());
  }

  changeMode = (e) => {
    this.setState({ active: e.target.id });
  }

  handleFilter = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  clearFilter = () => {
    this.setState(initFilter);
  }

  ModeButton = (id) => {
    const btnColor = id === this.state.active ? "ui violet button" : "ui button";
    return (<button id={id} className={btnColor} style={{ width: "50%" }} onClick={this.changeMode}>{id}</button>)
  }

  addWeaponToRepository = (e) => {
    const weapon = weapons.find(weapon => weapon.Id === e.target.id);
    console.log(weapon)
    this.setState({
      weaponRepository: [
        ...this.state.weaponRepository,
        {
          id: e.target.id,
          unbind: 0
        }
      ]
    });
  }

  removeWeaponFromRepository = (e) => {
    const { weaponRepository } = this.state;
    weaponRepository.splice(e.target.id, 1);
    this.setState({ weaponRepository });
  }

  clearRepository = () => {
    this.setState({ weaponRepository: [] });
  }

  incUnbind = (e) => {
    const { weaponRepository } = this.state;
    if (weaponRepository[e.target.id].unbind <= 3) {
      weaponRepository[e.target.id].unbind++;
      this.setState({ weaponRepository });
    }
  }

  descUnbind = (e) => {
    const { weaponRepository } = this.state;
    if (weaponRepository[e.target.id].unbind >= 1) {
      weaponRepository[e.target.id].unbind--;
      this.setState({ weaponRepository });
    }
  }

  render() {
    const { weaponRepository, type, rarity, tier } = this.state;
    const filterValue = { type, rarity, tier };

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
            filterValue={filterValue}
            handleFilter={this.handleFilter}
          />

          <div className="ui divider"></div>
          <WeaponList
            filteredWeapons={
              weapons
                .filter(weapon => this.filterWeapon(weapon.Type, type))
                .filter(weapon => this.filterWeapon(weapon.Rarity, rarity))
                .filter(weapon => this.filterWeapon(weapon.tier, tier))
            }
            addWeapon={this.addWeaponToRepository}
          />
        </div>

        <div id="result-panel" className="column">
          <CraftList
            weaponRepository={weaponRepository}
            clearRepository={this.clearRepository}
            removeWeapon={this.removeWeaponFromRepository}
            incUnbind={this.incUnbind}
            descUnbind={this.descUnbind}
          />

          {this.state.weaponRepository.length !== 0 &&
            <MaterialList
              weaponRepository={weaponRepository}
            />
          }
        </div>
      </div >
    );
  }
};

export default WeaponCraft;