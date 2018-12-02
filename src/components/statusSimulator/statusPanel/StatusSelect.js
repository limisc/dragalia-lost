import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RaritySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "5": ["50", "45", "40", "30", "20", "10", "0"],
      "4": ["40", "30", "20", "10", "0"],
      "3": ["30", "20", "10", "0"],
    }

    this._onChange = this._onChange.bind(this);
  }


  render() {
    const { disable, status: { rarity, mana, rarityField = [] } } = this.props;
    const { [rarity]: manaField = [] } = this.state;
    return (
      <div className="equal width fields">
        <div className="field">
          <label>Rarity</label>
          {this.isString(rarityField) ?
            <input disabled value={rarity} />
            :
            <select id="rarity" disabled={disable} value={rarity} onChange={this._onChange}>
              {rarityField.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
            </select>
          }
        </div>

        <div className="field">
          <label>Mana Circle</label>
          <select id="mana" disabled={disable} value={mana} onChange={this._onChange}>
            {manaField.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
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
    this.props.updateValue(id, value)
  }
}

RaritySelect.propTypes = {
  disable: PropTypes.bool,
  rarity: PropTypes.string,
  mana: PropTypes.string,
  updateValue: PropTypes.func,
};

export default RaritySelect;