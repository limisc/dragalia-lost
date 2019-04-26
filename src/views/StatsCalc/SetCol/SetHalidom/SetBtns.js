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
class SetBtns extends React.PureComponent {
  state = {
    btns: ['sync', 'del', 'load', 'save'],
  };

  render() {
    return (
      <div className="set-btns gutter-top flex">
        {this.state.btns.map(btn => (
          <Button
            key={btn}
            name={btn}
            variant="contained"
            className="col-2 col-4"
            onClick={this.onClick}
          >
            {this.getIcons(btn)}
          </Button>
        ))}
      </div>
    );
  }

  onClick = e => {
    const { name } = e.currentTarget;
    switch (name) {
      case 'sync':
      case 'load':
        this.props.loadHalidom(name);
        break;
      case 'del':
        removeState('calcHalidom');
        break;
      case 'save':
        saveState('calcHalidom', this.props.halidom);
        break;
      default:
        break;
    }
  };

  getIcons = btn => {
    switch (btn) {
      case 'sync':
        return <CloudDownloadOutlined />;
      case 'del':
        return <DeleteForeverOutlined />;
      case 'load':
        return <RefreshOutlined />;
      case 'save':
        return <SaveOutlined />;
      default:
        return undefined;
    }
  };
}

const mapStateToProps = ({ halidom }) => {
  return { halidom };
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
