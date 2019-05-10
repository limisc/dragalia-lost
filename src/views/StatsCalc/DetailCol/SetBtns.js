/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Context, ToggleButton } from 'components';
import { translate, resetAll } from 'actions';

const SetBtns = ({ expand, expandDisabled, setExpand, resetAll }) => {
  const { lang } = useContext(Context);

  return (
    <div className="set-btns flex">
      <span className="col-3" />

      <ToggleButton
        id="stats"
        width="col-3"
        labelOn="stats"
        labelOff="check"
        disabled={expandDisabled}
        checked={expand}
        setChecked={setExpand}
      />

      <Button className="col-3" variant="contained" onClick={resetAll}>
        {translate('reset', lang)}
      </Button>
    </div>
  );
};

const mapStateToProps = ({ stats: { adventurer } }) => {
  const expandDisabled = !adventurer;
  return { expandDisabled };
};

const mapDispatchToProps = dispatch => {
  return {
    resetAll: () => dispatch(resetAll()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetBtns);
