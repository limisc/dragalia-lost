import React, { Component } from 'react';
import StatusPanel from './statusPanel/StatusPanel';
import SelectPanel from './selectPanel/SelectPanel';

class StatusCalc extends Component {
  render() {
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div id="left-panel" className="nine wide column">
          <StatusPanel />
        </div>

        <div id="right-panel" className="six wide column">
          <SelectPanel />
        </div>
      </div>
    );
  }
}

export default StatusCalc;