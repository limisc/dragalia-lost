import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { selectOption, resetOptions } from 'actions';
import { getFilterFields, getPaperBGC } from 'utils';
import { CheckSet, Input } from 'components';

function Filter(props) {
  const {
    fields,
    lang,
    options,
    search,
    theme,
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
    <div id="item-filter" className="paper" style={getPaperBGC(theme)}>
      <div id="item-options">
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

      <div className="input-btn">
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />

        <button type="button" onClick={resetFilters}>
          Clear
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ focused, options, theme }) => {
  const fields = getFilterFields(focused);
  return {
    fields,
    options,
    theme,
  };
};

const mapDispatchToProps = {
  selectOption,
  resetOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
