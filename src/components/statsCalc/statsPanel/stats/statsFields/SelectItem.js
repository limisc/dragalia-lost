import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { updateStats } from '../../../../../redux/actions/actions';
import ui from '../../../../../redux/store/data/ui_data';
const mapStateToProps = (state) => {
  return {
    language: state.language,
    stats: state.stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (section, key, value) => dispatch(updateStats(section, key, value)),
  }
}

class SelectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mana: {
        5: ["50", "45", "40", "30", "20", "10", "0"],
        4: ["40", "30", "20", "10", "0"],
        3: ["30", "20", "10", "0"],
      },
      curRarity: {
        5: ["5"],
        4: ["5", "4"],
        3: ["5", "4", "3"],
      },
      unbind: ["4", "3", "2", "1", "0"],
    }
    this._onChange = this._onChange.bind(this);
    this.getSelectOptions = this.getSelectOptions.bind(this);
  }

  render() {
    const { language, section, label, stats } = this.props;

    return (
      <div className="field">
        {stats[section] &&
          <Fragment>
            <label>{ui[label][language]}</label>

            <select id={label} value={stats[section][label]} onChange={this._onChange}>
              {this.getSelectOptions().map(opt => <option key={uuidv4()} value={opt}>{opt}</option>)}
            </select>
          </Fragment>
        }
      </div>
    );
  }


  getSelectOptions() {
    const { section, label, stats } = this.props;
    const { [label]: options } = this.state;
    if (section === "adventurer") {
      if (label === "curRarity") {
        return options[stats[section].rarity];
      } else if (label === "mana") {
        return options[stats[section].curRarity];
      }
    } else if (label === "unbind") {
      return options;
    }
    return [];
  }

  _onChange(e) {
    const { section, onChange } = this.props;
    onChange(section, e.target.id, e.target.value)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectItem);