/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Context } from 'components';
import { translate, resetAll } from 'actions';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const SetBtns = props => {
  const { expand, expandDisabled, toggleExpand, resetAll } = props;
  const { lang } = useContext(Context);

  return (
    <div className="set-btns flex">
      <Button className="col-3" variant="contained" disabled>
        mode
      </Button>
      <Button
        className="col-3"
        variant="contained"
        disabled={expandDisabled}
        onClick={toggleExpand}
      >
        {expand ? <ExpandLess /> : <ExpandMore />}
      </Button>

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
