import React, { Component } from 'react';
// import WeaponCraft from './components/weaponCraft/WeaponCraft';
import StatsCalc from './components/statsCalc/StatsCalc';
class App extends Component {
  render() {
    return (
      <div id="app">
        {/* <WeaponCraft/> */}
        <StatsCalc/>
      </div >
    );
  }
}

export default App;