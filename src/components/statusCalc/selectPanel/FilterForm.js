import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { setFilters } from '../../../redux/actions/actions';
const mapStateToProps = (state) => {
  const { filters } = state;
  return {
    filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (key, value) => dispatch(setFilters(key, value)),
  }
}
class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: {
        type: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
        element: ["Flame", "Water", "Wind", "Light", "Shadow"],
        rarity: ["5", "4", "3"],
        tier: ["3", "2", "1"],
      },
    }
    this._onChange = this._onChange.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.filters !== this.props.filters || nextProps.filterField !== this.props.filterField;
  // }

  render() {
    const {
      props: { filters, filterField },
      state: { filterOptions }
    } = this;

    // console.log("FilterForm")
    return (
      <div className="ui form">
        <div className="four fields">
          {filterField.map(field =>
            <div className="field" key={uuidv4()}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()}</label>
              <select id={field} value={filters[field]} onChange={this._onChange}>
                <option value="">All</option>
                {filterOptions[field].map(opt => <option key={uuidv4()} value={opt}>{opt}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>
    );
  }

  _onChange(e) {
    this.props.onChange(e.target.id, e.target.value);
  }
}

FilterForm.propTypes = {
  filterField: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterForm);