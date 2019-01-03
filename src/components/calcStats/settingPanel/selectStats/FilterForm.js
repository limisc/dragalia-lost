import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { translate, setFilters, resetFilters } from "../../../../redux/actions/actions";

const mapStateToProps = (state) => {
  return {
    language: state.language,
    filters: state.filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (key, value) => dispatch(setFilters(key, value)),
    resetFilters: () => dispatch(resetFilters()),
  };
}

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
      element: ["Flame", "Water", "Wind", "Light", "Shadow"],
      rarity: ["5", "4", "3"],
      tier: ["3", "2", "1"],
    }
    this._onChange = this._onChange.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const { language, filters, filterField } = this.props;
    return (
      <div className="ui form">
        <div className="four fields">
          {filterField.map(field =>
            <div className="field" key={field}>
              <label>{translate(field, language)}</label>
              <select id={field} value={filters[field]} onChange={this._onChange}>
                <option value="">All</option>
                {(field === "type" || field === "element") ?
                  this.state[field].map(opt => <option key={opt} value={opt}>{translate(opt, language)}</option>)
                  :
                  this.state[field].map(opt => <option key={opt} value={opt}>{opt}</option>)
                }
              </select>
            </div>
          )}
          <div className="field">
            <label>&nbsp;</label>
            <button className="ui fluid button" onClick={this._onClick}>Clear</button>
          </div>
        </div>
      </div>
    );
  }

  _onChange = (e) => {
    this.props.setFilters(e.target.id, e.target.value);
  }

  _onClick = () => {
    this.props.resetFilters();
  }
}


FilterForm.propTypes = {
  filterField: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterForm);