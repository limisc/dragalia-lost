import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { capitalise, resetFilters, setFilters } from '../../../redux/actions/actions';

const mapStateToProps = (state) => {
  const { language, filters } = state;
  return {
    language,
    filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(resetFilters()),
    onChange: (key, value) => dispatch(setFilters(key, value)),
  }
}
class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: {
        weaponType: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
        element: ["Flame", "Water", "Wind", "Light", "Shadow"],
        rarity: ["5", "4", "3"],
        tier: ["3", "2", "1"],
      }
    }

    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.filters !== this.props.filters || nextProps.filterField !== this.props.filterField;
  }

  render() {
    const { filters, filterField } = this.props;
    // const language = "zh";
    return (
      <div className="ui form">
        <div className="four fields">
          {filterField.map(field =>
            <div className="field" key={uuidv4()}>
              <label>{capitalise(field)}</label>
              <select id={field} value={filters[field]} onChange={this._onChange}>
                <option value="">All</option>
                {this.state.filterOptions[field].map(opt => <option key={uuidv4()} value={opt}>{opt}</option>)}
              </select>
            </div>
          )}
          <div className="field">
            <label>&nbsp;</label>
            <button className="ui button" onClick={this._onClick}>Clear</button>
          </div>
        </div>
      </div>
    );
  }

  _onClick() {
    this.props.onClick();
  }

  _onChange(e) {
    this.props.onChange(e.target.id, e.target.value);
  }
}

FilterForm.propTypes = {
  filterField: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterForm);