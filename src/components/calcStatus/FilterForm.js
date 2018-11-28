import React from 'react';

const FilterForm = (props) => {

  const { filters, filterFields, filterOptions, handleFilter } = props;
  return (
    <div className="ui form">
      <div className="three fields">
        {filterFields.map((field, i) => (
          <div className="field" key={i}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <select id={field} value={filters[field]} onChange={handleFilter}>
              <option value="">All</option>
              {filterOptions[field].map((opt, j) => (<option key={j} value={opt}>{opt}</option>))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterForm;