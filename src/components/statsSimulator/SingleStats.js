import React, { Component } from 'react';
import PropTypes from 'prop-types';



class SingleStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      stats: {},
    }
    this.inputUpdate = this.inputUpdate.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.stats !== this.props.stats;
  // }

  static getDerivedStateFromProps(props, state) {
    const { stats } = props;
    if (stats) {
      if (state.stats === {} || stats.MAX_LEVEL !== state.stats.MAX_LEVEL || stats.Id !== state.stats.Id) {
        return {
          disabled: false,
          stats: { ...stats },
        };
      }
    } else {
      return {
        disabled: true,
        stats: {},
      }
    }
    return null;
  }

  inputUpdate(e) {
    const { section, updateLevel } = this.props;
    const { stats } = this.state;
    const { MAX_LEVEL } = stats;
    let level = e.target.value < MAX_LEVEL ? e.target.value : MAX_LEVEL;
    let timeId = 0;
    clearTimeout(timeId)

    this.setState({
      stats: {
        ...stats,
        level,
      }
    }, () => {
      if (level === "") {
        level = 1;
        timeId = setTimeout(() => {
          this.setState({
            stats: {
              ...stats,
              level,
            }
          })
        }, 1000);
      }
      updateLevel(section, level)
    });
  }



  render() {
    const base_dir = process.env.PUBLIC_URL;
    const { section, handleSection, modifyUnbind } = this.props;
    const {
      disabled,
      stats: {
        level = "",
        mana = "",
        unbind = 4,
        img = "add.png",
        Name = section.charAt(0).toUpperCase() + section.slice(1).toLowerCase()
      }
    } = this.state;

    return (
      <div className="three column row">
        <div id="avatar-section" className="three wide column">
          <img
            alt="add.png"
            className="avatar"
            src={!disabled ? `${base_dir}/img/${section}/${img}` : `${base_dir}/img/icon/${img}`}
            onClick={() => handleSection(section)}
          />
          <p style={{ textAlign: "center" }}>
            <b>{Name}</b>
          </p>
        </div>

        <div id="setting-section" className="six wide column">
          {section !== "adventurer" &&
            <div className="unbind set" style={{ textAlign: "right" }} >
              <img
                id="unbind_set"
                alt="left-icon"
                src={`${base_dir}/img/icon/left-icon.png`}
                onClick={!disabled ? () => modifyUnbind(section, -1) : null}
              />
              <img
                id="unbind_set"
                alt="unbind_image"
                src={`${base_dir}/img/unbind/${unbind}_Unbind.png`}
              />
              <img
                id="unbind_set"
                alt="right-icon"
                src={`${base_dir}/img/icon/right-icon.png`}
                onClick={!disabled ? () => modifyUnbind(section, 1) : null} />
            </div>
          }
          <div className="ui form">
            <div className="inline field" style={{ textAlign: "right" }}>
              <label>Level</label>
              <input
                type="number"
                id={section}
                disabled={disabled}
                value={level}
                onChange={this.inputUpdate} />
            </div>
          </div>

          {section === "adventurer" &&
            <div className="ui form">
              <div className="inline field" style={{ textAlign: "right", marginTop: "20px" }}>
                <label>Mana Circle</label>
                <select disabled={disabled}>
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
      </div >
    );
  }
}

SingleStats.propTypes = {
  section: PropTypes.string,
  stats: PropTypes.object,
  handleSection: PropTypes.func,
  updateLevel: PropTypes.func,
  modifyUnbind: PropTypes.func,
};

export default SingleStats;