/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withTheme } from 'components';
import { saveState, removeState, loadHalidom } from 'actions';
import {
  CloudDownloadOutlined,
  RefreshOutlined,
  DeleteForeverOutlined,
  SaveOutlined,
} from '@material-ui/icons';

const SetBtns = ({ halidom, simc, loadHalidom }) => {
  const btns = ['sync', 'del', 'load', 'save'];
  const onClick = ({ currentTarget: { name } }) => {
    const key = simc ? 'simcHalidom' : 'calcHalidom';
    switch (name) {
      case 'sync':
      case 'load':
        loadHalidom(name);
        break;
      case 'del':
        removeState(key);
        break;
      case 'save':
        saveState(key, halidom);
        break;
      default:
        break;
    }
  };

  const icon = btn =>
    ({
      sync: <CloudDownloadOutlined />,
      del: <DeleteForeverOutlined />,
      load: <RefreshOutlined />,
      save: <SaveOutlined />,
    }[btn]);

  return (
    <div className="set-btns gutter-top flex">
      {btns.map(btn => (
        <Button
          key={btn}
          name={btn}
          variant="contained"
          className="col-2 col-4"
          onClick={onClick}
        >
          {icon(btn)}
        </Button>
      ))}
    </div>
  );
};

const mapStateToProps = ({ halidom, simc }) => {
  return { halidom, simc };
};

const mapDispatchToProps = dispatch => {
  return {
    loadHalidom: variant => dispatch(loadHalidom(variant)),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SetBtns)
);
