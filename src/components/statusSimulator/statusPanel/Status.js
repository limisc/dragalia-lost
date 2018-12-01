import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        mana = 0,
        rarity = "5",
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
              <div className="equal width fields">
                <div className="field">
                  <label>Rarity</label>
                  <select id="rarity" disabled={disable} value={rarity} onChange={this.updateValue}>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="field">
                  <label>Mana Circle</label>
                  <select id="mana" disabled={disable} value={mana} onChange={this.updateValue}>
                    <option value="50">50</option>
                    <option value="40">40</option>
                    <option value="30">30</option>
                    <option value="20">20</option>
                    <option value="10">10</option>
                    <option value="0">0</option>
                  </select>
                </div>
              </div>
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
    // const { id, value } = e.target;
    const { id, value = e.target.dataset.value } = e.target;
    console.log(id, value)
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