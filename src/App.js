import React, { Component } from 'react';
// import WeaponCraft from './components/weaponCraft/WeaponCraft';
import StatusCalc from './components/statusCalc/StatusCalc';
class App extends Component {
  render() {
    return (
      <div id="app">
        {/* <WeaponCraft/> */}
        <StatusCalc/>
      </div >
    );
  }
}

export default App;