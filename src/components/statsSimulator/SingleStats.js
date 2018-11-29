import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SingleStats extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.stats !== this.props.stats;
  }


  render() {
    const base_dir = process.env.PUBLIC_URL;
    const { section, stats, handleSection } = this.props;
    const avatarProps = {
      className: "avatar",
      src: stats ? `${base_dir}/img/${section}/${stats.img}` : `${base_dir}/img/icon/add.png`,
      onClick: () => handleSection(section),
    }

    return (
      <div className="three column row">
        <div id="avatar-section" className="three wide column">
          <img alt="add.png" {...avatarProps} />
          <p style={{ textAlign: "center" }}>
            <b>{stats ? stats.Name : section.charAt(0).toUpperCase() + section.slice(1).toLowerCase()}</b>
          </p>
        </div>

        <div id="setting-section" className="six wide column">
          {section !== "adventurer" &&
            <div className="unbind set" style={{ textAlign: "right" }}>
              <img id="unbind_set" src={`${base_dir}/img/icon/left-icon.png`} alt="left-icon" />
              <img id="unbind_set" src={`${base_dir}/img/unbind/4_Unbind.png`} alt="unbind_image" />
              <img id="unbind_set" src={`${base_dir}/img/icon/right-icon.png`} alt="right-icon" />
            </div>
          }
          <div className="ui form">
            <div className="inline field" style={{ textAlign: "right" }}>
              <label>Level</label>
              <input type="text" />
            </div>
          </div>

          {section === "adventurer" &&
            <div className="ui form">
              <div className="inline field" style={{ textAlign: "right", marginTop: "20px" }}>
                <label>Mana Circle</label>
                <select>
                  <option>50</option>
                  <option>40</option>
                  <option>30</option>
                  <option>20</option>
                  <option>10</option>
                  <option>0</option>
                </select>
              </div>
            </div>
          }
        </div>

        <div id="stats-section" className="column">
          <div style={{ margin: "25px" }}>
            <p>HP</p>
            <p>STR</p>
          </div>

        </div>

      </div>
    );
  }
}

SingleStats.propTypes = {
  section: PropTypes.string,
  stats: PropTypes.object,
  handleSection: PropTypes.func,
};

export default SingleStats;