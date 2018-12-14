import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import uuidv4 from 'uuid/v4';
import Stats from './stats/Stats';
import HalidomStats from './stats/HalidomStats';

const mapStateToProps = (state) => {
  const { adventurer, dragon } = state.stats;
  return {
    // adventurer,
    // dragon,
  };
}

class StatsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: ["adventurer", "weapon", "wyrmprint", "dragon"],
      halidom: ["element", "weaponType", "statue"],
    }
  }
  /*
  halidom,  section : "adventurer", "dragon"
            "field": "element", "weaponType",

  */

  render() {
    const { sections, halidom } = this.state;
    return (
      <Fragment>
        {/* <div className="ui doubling stackable vertically divided grid "> */}
        {sections.map(section =>
          <Stats
            key={section}
            section={section}
          />
        )}
        {/* </div> */}
        <div className="ui divider"></div>
        Halidom %
        {halidom.map(field =>
          <HalidomStats
            key={field}
            field={field}
          />
        )}
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
)(StatsPanel);