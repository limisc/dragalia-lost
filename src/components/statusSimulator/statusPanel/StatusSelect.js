import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RaritySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "5": ["50", "40", "30", "20", "10", "0"],
      "4": ["40", "30", "20", "10", "0"],
      "3": ["30", "20", "10", "0"],
    }
  }


  render() {
    const { disable, status: { rarity, mana, rarityField = [] }, updateValue } = this.props;
    const { [rarity]: manaField = [] } = this.state;
    return (
      <div className="equal width fields">
        <div className="field">
          <label>Rarity</label>
          {this.isString(rarityField) ?
            <input disabled value={rarity} />
            :
            <select id="rarity" disabled={disable} value={rarity} onChange={updateValue}>
              {rarityField.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
            </select>
          }
        </div>

        <div className="field">
          <label>Mana Circle</label>
          <select id="mana" disabled={disable} value={mana} onChange={updateValue}>
            {manaField.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
          </select>
        </div>
        {/* <div className="field">
          <label>Rarity</label>
          {rarity === "5" ?
            <input id="rarity" disabled value={rarity} />
            :
            <select id="rarity" disabled={disable} value={rarity} onChange={updateValue}>
              {rarityField.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
            </select>
          }
        </div>

        <div className="field">
          <label>Mana Circle</label>
          <select id="mana" disabled={disable} value={mana} onChange={updateValue}>
            {this.state.mana[rarity].map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
          </select>
        </div> */}
      </div>
    );
  }

  isString(value) {
    return typeof value === 'string' || value instanceof String;
  }
}

RaritySelect.propTypes = {
  disable: PropTypes.bool,
  rarity: PropTypes.string,
  mana: PropTypes.string,
  updateValue: PropTypes.func,
};

export default RaritySelect;