import React from 'react';
import { connect } from 'react-redux';
import { selectOption, resetOptions } from 'actions';
import { getFilterFields, useEvent } from 'utils';
import { CheckSet } from 'components';

function Filter(props) {
  const {
    fields,
    options,
    search,
    resetOptions,
    selectOption,
    setSearch,
  } = props;

  const handleChange = useEvent(e => {
    const { checked, name, value } = e.target;
    selectOption({ checked, name, value });
  });

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const onClick = () => {
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
            options={options[key]}
            onChange={handleChange}
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

        <button type="button" className="input-btn" onClick={onClick}>
          Clear
        </button>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    options: state.options,
    fields: getFilterFields(state),
  };
};

const actionCreators = {
  selectOption,
  resetOptions,
};

export default connect(mapStateToProps, actionCreators)(Filter);
