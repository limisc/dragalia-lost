/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withTheme } from 'components';
import { translate, resetAll } from 'actions';
import {
  ExpandLess,
  ExpandMore,
  ChevronRight,
  ChevronLeft,
} from '@material-ui/icons';

class SetBtns extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { lang, expand, expandDisabled, toggle, resetAll } = this.props;

    return (
      <div className="set-btns flex">
        <Button
          className="col-2 col-4"
          variant="contained"
          onClick={this.toggleDrawer}
        >
          {this.state.open ? <ChevronLeft /> : <ChevronRight />}
        </Button>

        <Button className="col-2 col-4" variant="contained" disabled>
          mode
        </Button>

        <Button
          className="col-2 col-4"
          variant="contained"
          disabled={expandDisabled}
          onClick={toggle}
        >
          {expand ? <ExpandLess /> : <ExpandMore />}
        </Button>

        <Button className="col-2 col-4" variant="contained" onClick={resetAll}>
          {translate('reset', lang)}
        </Button>
      </div>
    );
  }

  toggleDrawer = () => this.setState(state => ({ open: !state.open }));
}

const mapStateToProps = ({ stats: { adventurer } }) => {
  const expandDisabled = !adventurer;
  return { expandDisabled };
};

const mapDispatchToProps = dispatch => {
  return {
    resetAll: () => dispatch(resetAll()),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SetBtns)
);
