import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Stats from './stats/Stats';
import HalidomStats from './stats/HalidomStats';

const mapStateToProps = (state) => {
  return {
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

  render() {
    const { sections, halidom } = this.state;
    return (
      <Fragment>
        {sections.map(section =>
          <Stats
            key={section}
            section={section}
          />
        )}
        <div className="ui divider"></div>
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