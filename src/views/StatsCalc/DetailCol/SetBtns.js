/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Context, ToggleButton } from 'components';
import { setSimc, resetAll, translate } from 'actions';

const SetBtns = ({
  expand,
  expandDisabled,
  setExpand,
  simc,
  setSimc,
  resetAll,
}) => {
  const { lang } = useContext(Context);

  return (
    <div className="flex">
      <ToggleButton
        id="simc"
        width="col-3"
        labelOn="simc"
        labelOff="calc"
        checked={simc}
        setChecked={setSimc}
      />

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

const mapStateToProps = ({ simc, stats: { adventurer } }) => {
  const expandDisabled = !adventurer;
  return { simc, expandDisabled };
};

const mapDispatchToProps = dispatch => {
  return {
    setSimc: simc => dispatch(setSimc(simc)),
    resetAll: () => dispatch(resetAll()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetBtns);
