import React, { Component } from 'react';
import { connect } from 'react-redux';
// import uuidv4 from 'uuid/v4';
import Stats from './stats/Stats';

const mapStateToProps = (state) => {
  console.log(state)
  return {

  };
}

class StatsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: ["adventurer", "weapon", "wyrmprint", "dragon"],
    }
  }

  render() {
    const { sections } = this.state;
    return (
      <div className="ui two column grid">
        {sections.map(section =>
          <Stats
            key={section}
            section={section}
          />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(StatsPanel);