import React, { Component } from 'react';
// import WeaponCraft from './components/weaponCraft/WeaponCraft';
import StatsSimulator from './components/statsSimulator/StatsSimulator';
class App extends Component {
  render() {
    return (
      <div id="app">
        {/* <WeaponCraft/> */}
        <StatsSimulator/>
      </div >
    );
  }
}

export default App;