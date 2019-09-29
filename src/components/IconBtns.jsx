import React from 'react';
import { Button } from '@material-ui/core';
import {
  Add,
  DeleteForeverOutlined,
  RefreshOutlined,
  SaveOutlined,
} from '@material-ui/icons';

const ICONS = {
  add: <Add />,
  del: <DeleteForeverOutlined />,
  refresh: <RefreshOutlined />,
  save: <SaveOutlined />,
};

const defaultProps = {
  btns: [],
};

function IconBtns({ btns, onClick }) {
  return (
    <div className="icon-btns">
      {btns.map(btn => {
        return (
          <Button variant="outlined" key={btn} name={btn} onClick={onClick}>
            {ICONS[btn] || btn}
          </Button>
        );
      })}
    </div>
  );
}

IconBtns.defaultProps = defaultProps;

export default React.memo(IconBtns);
