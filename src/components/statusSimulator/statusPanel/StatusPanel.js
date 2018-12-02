import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Status from './Status';

class StatusPanel extends Component {

  render() {
    const { IMG_PATH, sections, sets, handleSection, updateStatus } = this.props;
    return (
      <div className="ui vertically divided grid">
        {sections.map((section, i) =>
          <Status
            key={i}
            IMG_PATH={IMG_PATH}
            section={section}
            status={sets[section]}
            handleSection={handleSection}
            updateStatus={updateStatus}
          />
        )}
        <div className="three column row">
          <div id="avatar-section" className="three wide column">
            <img
              alt="halidom.png"
              className="avatar"
              src={`${IMG_PATH}/icon/halidom.png`}
            />
            <p style={{ textAlign: "center" }}>
              <b>Facility</b>
            </p>
          </div>


        </div>




      </div >
    );
  }
}

StatusPanel.propTypes = {
  IMG_PATH: PropTypes.string,
  sections: PropTypes.array,
  sets: PropTypes.object,
  handleSection: PropTypes.func,
  updateStatus: PropTypes.func
};

export default StatusPanel;