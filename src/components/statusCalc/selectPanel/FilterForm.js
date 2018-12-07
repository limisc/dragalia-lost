import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFilters } from '../../../redux/actions/actions';

function mapStateToProps(state) {
  const { filters, UIData: { filterOptions } } = state;
  return {
    filters,
    filterOptions,
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
    this._onChange = this._onChange.bind(this);
  }


  shouldComponentUpdate(nextProps) {
    return nextProps.filters !== this.props.filters || nextProps.filterField !== this.props.filterField;
  }

  render() {
    const { filters, filterField, filterOptions } = this.props;
    return (
      <div className="ui form">
        <div className="four fields">

          {filterField.map((field, i) =>
            <div className="field" key={i}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()}</label>
              <select id={field} value={filters[field]} onChange={this._onChange}>
                <option value="">All</option>
                {filterOptions[field].map((opt, j) => (<option key={j} value={opt}>{opt}</option>))}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterForm);