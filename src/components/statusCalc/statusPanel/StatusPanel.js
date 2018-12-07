import React, { Component } from 'react';
import { connect } from 'react-redux';
import Status from './status/Status';
import uuidv4 from 'uuid/v4';

const mapStateToProps = (state) => {
  return {
  };
}

class StatusPanel extends Component {
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
          <Status
            key={uuidv4()}
            section={section}
          />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(StatusPanel);