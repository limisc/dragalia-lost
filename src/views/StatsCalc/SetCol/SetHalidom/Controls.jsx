//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withTheme } from 'components';
import {
  translate,
  saveState,
  removeState,
  loadHalidom,
} from 'appRedux/actions';

class Controls extends React.Component {
  state = {
    btns: ['sync', 'del', 'load', 'save'],
  };

  render() {
    // TODO implement func
    return (
      <div className="controls flex gutter-top">
        {this.state.btns.map(btn => (
          <Button
            key={btn}
            id={btn}
            variant="contained"
            className="col-2 col-4"
            onClick={this.onClick}
          >
            {translate(btn, this.props.lang)}
          </Button>
        ))}
      </div>
    );
  }

  onClick = e => {
    const { id } = e.currentTarget;
    switch (id) {
      case 'sync':
      case 'load':
        this.props.loadHalidom(id);
        break;
      case 'del':
        // TODO change key: mode
        removeState('calcHalidom');
        break;
      case 'save':
        saveState('calcHalidom', this.props.halidom);
        break;
      default:
        break;
    }
  };
}

const mapStateToProps = ({ halidom }) => {
  return { halidom };
};

const mapDispatchToProps = dispatch => {
  return {
    loadHalidom: variation => dispatch(loadHalidom(variation)),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Controls)
);
