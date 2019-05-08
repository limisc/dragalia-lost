/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import classNames from 'classnames';
import { Context } from 'components';
import { translate, resetAll } from 'actions';

const SetBtns = ({ expand, expandDisabled, setExpand, resetAll }) => {
  const { lang } = useContext(Context);
  const switchBtn = classNames({ 'toggle-switch': !expandDisabled });

  return (
    <div className="set-btns flex">
      <span className="col-3" />

      <div className="toggle col-3">
        <input
          type="checkbox"
          id="simc"
          className="toggle-checkbox"
          disabled={expandDisabled}
          checked={expand}
          onChange={e => setExpand(e.target.checked)}
        />
        <label className="toggle-label" htmlFor="simc">
          <span className="toggle-inner" />
          <span className={switchBtn} />
        </label>
      </div>

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
