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
    this.selectUpdate = this.selectUpdate.bind(this);
    this.calcStats = this.calcStats.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.stats !== this.props.stats;
  // }

  static getDerivedStateFromProps(props, state) {
    const { stats } = props;
    if (stats) {
      if (Object.getOwnPropertyNames(state.stats).length === 0 || stats.MAX_LEVEL !== state.stats.MAX_LEVEL || stats.Id !== state.stats.Id) {
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
    clearTimeout(timeId);
    this.setState({
      stats: {
        ...stats,
        level,
      }
    })
    timeId = setTimeout(updateLevel(section, level), 1000);
  }

  selectUpdate(e) {
    console.log(e.target.id, e.target.value)
    const { stats } = this.state;
    this.setState({
      stats: {
        ...stats,
        [e.target.id]: e.target.value,
      }
    });
  }


  calcStats() {
    const { stats } = this.state;
    if (Object.getOwnPropertyNames(stats).length !== 0) {
      const {
        level,
        mana,
        rarity,
        MinHp3,
        MinHp4,
        MinHp5,
        MaxHp,
        PlusHp0,
        PlusHp1,
        PlusHp2,
        PlusHp3,
        PlusHp4,
        McFullBonusHp5,
      } = stats;

      const min_Hp = `MinHp${rarity}`;
      const step = (MaxHp - MinHp5) / (80 - 1);
      const statsGain = (level - 1) * step;
      const hp = Math.ceil(stats[min_Hp] + statsGain)

      console.log(step, statsGain, hp)
    }
  }
  render() {
    const base_dir = process.env.PUBLIC_URL;
    const { section, handleSection, modifyUnbind } = this.props;
    const {
      disabled,
      stats: {
        level = "",
        mana = "0",
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
            <div className="unbind set" style={{ textAlign: "center" }} >
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
            <div className="fields">
              <div className="field" style={{ width: "100%" }}>
                <label>Level</label>
                <input
                  type="number"
                  id={section}
                  disabled={disabled}
                  value={level}
                  onChange={this.inputUpdate}
                />
              </div>
            </div>

            {section === "adventurer" &&
              <div className="equal width fields">
                <div className="field">
                  <label>Rarity</label>
                  <select value={rarity} disabled={disabled}>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="field">
                  <label>Mana Circle</label>
                  <select id="mana" value={mana} disabled={disabled} onChange={this.selectUpdate}>
                    <option value="50">50</option>
                    <option value="40">40</option>
                    <option value="30">30</option>
                    <option value="20">20</option>
                    <option value="10">10</option>
                    <option value="0">0</option>
                  </select>
                </div>
              </div>
            }
          </div>
        </div>

        <div id="stats-section" className="column">
          <div style={{ margin: "25px" }}>
            <p>HP:    {this.calcStats()}</p>
            <p>STR</p>


            {section === "adventurer" &&
              <button id="reset-btn" className="ui violet button">Reset</button>
            }
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
  updateMana: PropTypes.func,
  modifyUnbind: PropTypes.func,
};

export default SingleStats;