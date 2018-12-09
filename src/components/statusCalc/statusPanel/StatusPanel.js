import React, { Component } from 'react';
import { connect } from 'react-redux';
import Status from './status/Status';
import FacilityStatus from './status/FacilityStatus';
// import uuidv4 from 'uuid/v4';

const mapStateToProps = (state) => {
  const { adventurer, facility } = state.statusSets;
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
    const { sections } = this.state;
    const { adventurer, facility } = this.props;
    return (
      <div className="ui two column grid">
        {sections.map((section, i) =>
          <Status
            key={i}
            section={section}
          />
        )}

        {this.facilityLayout(adventurer, facility)}
      </div>
    );
  }

  facilityLayout = (adventurer, facility) => {
    if (adventurer) {
      return (
        facility.typeList.map((facilityType, i) =>
          <FacilityStatus
            key={i}
            facilityType={facilityType}
          />
        )
      )
    } else if (facility.statue) {
      return (
        <FacilityStatus
          facilityType="statue"
        />
      )
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
)(StatusPanel);