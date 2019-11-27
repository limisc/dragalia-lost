import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { selectOption, resetOptions } from 'actions';
import { getFilterFields } from 'utils';
import { CheckSet } from 'components';

function Filter(props) {
  const {
    fields,
    lang,
    options,
    search,
    resetOptions,
    selectOption,
    setSearch,
  } = props;

  const handleFilter = useCallback(
    e => {
      const { checked, name, value } = e.target;
      selectOption({ checked, name, value });
    },
    [selectOption]
  );

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const resetFilters = () => {
    resetOptions();
    setSearch('');
  };

  return (
    <>
      <div className="options">
        {fields.map(key => (
          <CheckSet
            icon
            key={key}
            group={key}
            lang={lang}
            options={options[key]}
            onChange={handleFilter}
          />
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={search}
          placeholder="Search"
          spellCheck={false}
          onChange={handleSearch}
        />

        <button type="button" className="input-btn" onClick={resetFilters}>
          Clear
        </button>
      </div>
    </>
  );
}

const mapStateToProps = ({ focused, options }) => {
  const fields = getFilterFields(focused);
  return {
    fields,
    options,
  };
};

const actionCreators = {
  selectOption,
  resetOptions,
};

export default connect(mapStateToProps, actionCreators)(Filter);
