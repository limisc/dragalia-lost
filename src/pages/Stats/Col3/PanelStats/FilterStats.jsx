/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { resetFilters, selectFilter } from 'actions';
import { translate, useEventCallback } from 'utils';
import { Context, CheckBtns } from 'components';

function FilterStats({
  // rarity,
  // element,
  // weapon,
  filters,
  search,
  setSearch,
  resetFilters,
  selectFilter,
}) {
  const { lang } = React.useContext(Context);

  const handleSearch = useEventCallback(e => {
    setSearch(e.target.value);
  });

  const handleReset = () => {
    setSearch('');
    resetFilters();
  };

  const handleChange = useEventCallback(e => {
    const { checked, name, value } = e.target;
    selectFilter({ checked, name, value });
  });

  return (
    <>
      {Object.entries(filters).map(([key, item]) => {
        return (
          <CheckBtns key={key} btns={item} name={key} onChange={handleChange} />
        );
      })}
      <div id="search-bar">
        <TextField
          variant="filled"
          value={search}
          label={translate('search', lang)}
          InputProps={{ spellCheck: false }}
          onChange={handleSearch}
        />

        <Button color="secondary" variant="contained" onClick={handleReset}>
          RESET
        </Button>
      </div>
    </>
  );
}

const mapStateToProps = ({ filters }) => {
  return { filters };
};

const actionCreators = {
  selectFilter,
  resetFilters,
};

export default connect(
  mapStateToProps,
  actionCreators
)(FilterStats);
