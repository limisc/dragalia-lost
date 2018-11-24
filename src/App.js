import React, { Component } from 'react';
import WeaponCraft from './components/weaponCraft/WeaponCraft';
// import Test from './components/test/Test';

class App extends Component {
  render() {
    return (
      <div id="app">
        <WeaponCraft/>
        {/* <Test /> */}
      </div >
    );
  }
}

export default App;