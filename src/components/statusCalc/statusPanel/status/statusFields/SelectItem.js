import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
// import LEVEL_LIMIT from '../../../../../redux/store/data/level_data';
import { updateStatusAdventurerRarityMana } from '../../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  return {
    adventurer: state.statusSets.adventurer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateRarityMana: (key, value) => dispatch(updateStatusAdventurerRarityMana(key, value)),
  }
}

class SelectItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manaSelect: {
        "5": ["50", "45", "40", "30", "20", "10", "0"],
        "4": ["40", "30", "20", "10", "0"],
        "3": ["30", "20", "10", "0"],
      },
      raritySelect: {
        "3": ["5", "4", "3"],
        "4": ["5", "4"],
        "5": "5",
      }
    }
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const { adventurer } = this.props;
    const { rarity = "5", curRarity = "", mana } = adventurer || {};
    const { manaSelect: { [curRarity]: manaOptions = [] }, raritySelect: { [rarity]: rarityOptions } } = this.state;
    return (

      <div className="equal width fields">
        <div className="field">
          <label>Rarity</label>
          {this.isString(rarityOptions) ?
            <input disabled value={curRarity} />
            :
            <select id="curRarity" disabled={!adventurer} value={curRarity} onChange={this._onChange}>
              {rarityOptions.map(opt => <option key={uuidv4()} value={opt}>{opt}</option>)}
            </select>
          }
        </div>

        <div className="field">
          <label>Mana</label>
          <select id="mana" disabled={!adventurer} value={mana} onChange={this._onChange}>
            {manaOptions.map(opt => <option key={uuidv4()} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>
    );
  }

  isString(value) {
    return typeof value === 'string' || value instanceof String;
  }

  _onChange(e) {
    const { id, value } = e.target;
    this.props.updateRarityMana(id, value);
  }
}

SelectItem.propTypes = {
  //redux
  adventurer: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectItem);