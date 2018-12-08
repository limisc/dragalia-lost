import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputItem from './statusFields/InputItem';
// import uuidv4 from 'uuid/v4';

const mapStateToProps = (state) => {
  const { adventurer: { type, element }, facility } = state.statusSets;
  return {
    type,
    element,
    facility,
  };
}

class FacilityStatus extends Component {
  constructor(props) {
    super(props);
    this.getImagePath = this.getImagePath.bind(this);
  }

  render() {
    const { facilityType, facility: { [facilityType]: { contentList } } } = this.props;
    return (
      <div className="column">
        <div className="ui two column grid">
          <div className="six wide column">
            <img
              className="status-avatar"
              alt="facility_avatar"
              src={this.getImagePath()}
            />
            <p style={{ textAlign: "center" }}><b>{facilityType.charAt(0).toUpperCase() + facilityType.slice(1).toLowerCase()}</b></p>
          </div>

          <div className="nine wide column">
            <div className="ui form">
              <div className="two fields">
                {contentList.map((item, i) =>
                  <InputItem
                    key={i}
                    section="facility"
                    label={item}
                    facilityType={facilityType}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getImagePath() {
    const { facilityType, type, element } = this.props;
    const name = facilityType === "dojo" ? type : element;
    return `${process.env.PUBLIC_URL}/img/facility/${facilityType}_${name}.png`;
  }
}

FacilityStatus.propTypes = {
  //props
  facilityType: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
)(FacilityStatus);