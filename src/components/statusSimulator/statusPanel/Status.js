import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StatusSelect from './StatusSelect';
import LEVEL_LIMIT from '../../data/level_data'
class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disable: true,
      status: {},
    }

    this.updateValue = this.updateValue.bind(this);
  }

  render() {
    const { IMG_PATH, section, handleSection } = this.props;
    const {
      disable,
      status: {
        level = "",
        unbind = 4,
        img = "add.png",
        Name = section.charAt(0).toUpperCase() + section.slice(1).toLowerCase()
      }
    } = this.state;

    return (
      <div className="three column row">
        <div id="avatar-section" className="three wide column">
          <img
            alt={img}
            className="avatar"
            src={disable ? `${IMG_PATH}/icon/${img}` : `${IMG_PATH}/${section}/${img}`}
            onClick={() => handleSection(section)}
          />
          <p style={{ textAlign: "center" }}>
            <b>{Name}</b>
          </p>
        </div>

        <div id="setting-section" className="six wide column">
          <div className="ui form">
            <div className="fields">
              <div className="inline field" style={{ width: "100%" }}>
                <label>Level</label>
                <input
                  type="number"
                  disabled={disable}
                  id="level"
                  value={level}
                  onChange={this.updateValue}
                />
              </div>
            </div>

            {section === "adventurer" ?
              <StatusSelect
                disable={disable}
                status={this.state.status}
                updateValue={this.updateValue}
              />
              :
              <div className="unbind-set">
                <img
                  id="unbind"
                  data-value="-1"
                  className="unbind-set"
                  alt="left-icon"
                  src={`${IMG_PATH}/icon/left-icon.png`}
                  onClick={this.updateValue}
                />
                <img
                  className="unbind-set"
                  alt="unbind_image"
                  src={`${IMG_PATH}/unbind/${unbind}_Unbind.png`}
                />
                <img
                  id="unbind"
                  data-value="1"
                  className="unbind-set"
                  alt="right-icon"
                  src={`${IMG_PATH}/icon/right-icon.png`}
                  onClick={this.updateValue}
                />
              </div>
            }
          </div>
        </div>

        <div className="column">
          <p>HP</p>
          <p>STR</p>
        </div>
      </div>
    );
  }

  static getDerivedStateFromProps(props, state) {
    const { status } = props;
    if (status) {
      if (Object.getOwnPropertyNames(state.status).length === 0 || status.Id !== state.status.Id) {
        return {
          disable: false,
          status,
        }
      }
    } else {
      return {
        disable: true,
        status: {},
      }
    }
    return null;
  }

  updateValue(e) {
    const { id, value = e.target.dataset.value } = e.target;
    const status = { ...this.state.status };
    let { level, rarity, mana, unbind } = status;
    const { section, updateStatus } = this.props;
    //(neither unbindIncrement when unbind === 4) nor (unbindDecrement when unbind === 0)
    if ((id !== "unbind") || (value === "1" && unbind < 4) || (value === "-1" && unbind > 0)) {
      if (id === "level" && parseInt(value, 10) > this.getLevelLimit(section, rarity, unbind)) {
        status[id] = this.getLevelLimit(section, rarity, unbind);
      } else if (id === "unbind") {
        unbind = unbind + parseInt(value, 10);
        if (level > this.getLevelLimit(section, rarity, unbind)) {
          status.level = this.getLevelLimit(section, rarity, unbind);
        }
        status[id] = unbind;
      } else {
        if (id === "rarity") {
          //section === "adventurer", only adventurer could change rarity.
          if (parseInt(level, 10) > this.getLevelLimit(section, value)) {
            status.level = this.getLevelLimit(section, value)
          }
          if (parseInt(mana, 10) > this.getLevelLimit("mana", value)) {
            status.mana = this.getLevelLimit("mana", value);
          }
        }
        status[id] = value;
      }

      this.setState({ status });
      updateStatus(section, status);
    }
  }

  getLevelLimit(key, rarity, unbind = 4) {
    switch (key) {
      case "mana":
      case "adventurer":
        return LEVEL_LIMIT[key][rarity];
      default:
        return LEVEL_LIMIT[key][rarity][unbind];
    }
  }
}

Status.propTypes = {
  IMG_PATH: PropTypes.string,
  section: PropTypes.string,
  status: PropTypes.object,
  handleSection: PropTypes.func,
  updateStatus: PropTypes.func,
};

export default Status;