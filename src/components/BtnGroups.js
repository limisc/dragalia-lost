/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Add,
  CloudDownloadOutlined,
  RefreshOutlined,
  DeleteForeverOutlined,
  SaveOutlined,
} from '@material-ui/icons';
import { Button } from '@material-ui/core';

class BtnGroups extends React.PureComponent {
  state = {
    sync: <CloudDownloadOutlined />,
    load: <RefreshOutlined />,
    del: <DeleteForeverOutlined />,
    save: <SaveOutlined />,
    add: <Add />,
  };

  render() {
    const { className, btns, onClick } = this.props;

    return (
      <div className="btn-groups gutter-top flex">
        {btns.map(name => (
          <Button
            key={name}
            variant="contained"
            className={className}
            onClick={onClick(name)}
          >
            {this.state[name]}
          </Button>
        ))}
      </div>
    );
  }
}

export default BtnGroups;
