import React, { Component } from 'react';
// import WeaponCraft from './components/weaponCraft/WeaponCraft';
import StatusSimulator from './components/statusSimulator/StatusSimulator';
class App extends Component {
  render() {
    return (
      <div id="app">
        {/* <WeaponCraft/> */}
        <StatusSimulator/>
      </div >
    );
  }
}

export default App;