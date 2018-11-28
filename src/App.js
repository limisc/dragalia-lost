import React, { Component } from 'react';
// import WeaponCraft from './components/weaponCraft/WeaponCraft';
import CalcStatus from './components/calcStatus/CalcStatus';
class App extends Component {
  render() {
    return (
      <div id="app">
        {/* <WeaponCraft/> */}
        <CalcStatus/>
      </div >
    );
  }
}

export default App;