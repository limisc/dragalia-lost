import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { selectOption, resetOptions } from 'actions';
import { getFilterFields, useEvent } from 'utils';
import { CheckSet, Input } from 'components';

const Filter = forwardRef(function Filter(props, ref) {
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

  const handleSearch = useEvent(({ value }) => {
    setSearch(value);
  });

  const onClick = () => {
    resetOptions();
    ref.current.setValue('');
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
        <Input
          ref={ref}
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />

        <button type="button" className="input-btn" onClick={onClick}>
          Clear
        </button>
      </div>
    </>
  );
});

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

export default connect(mapStateToProps, actionCreators, null, {
  forwardRef: true,
})(Filter);
