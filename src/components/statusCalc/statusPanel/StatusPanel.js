import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import Status from './status/Status';
import FacilityStatus from './facilityStatus/FacilityStatus';
function mapStateToProps(state) {
  const { statusSets: { adventurer, facility } } = state;
  return {
    adventurer,
    facility,
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

    const { state: { sections }, props: { adventurer, facility } } = this;
    return (
      <div className="ui two column grid">
        {sections.map(section =>
          <Status
            key={uuidv4()}
            section={section}
          />
        )}

        {adventurer &&
          facility.typeList.map(facilityType =>
            <FacilityStatus
              key={uuidv4()}
              facilityType={facilityType}
            />
          )
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(StatusPanel);