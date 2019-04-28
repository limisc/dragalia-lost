/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withTheme } from 'components';
import { translate, resetAll } from 'actions';
import { ExpandLess, ExpandMore, ChevronRight } from '@material-ui/icons';
import NavDrawer from './NavDrawer';

class SetBtns extends React.Component {
  state = { open: false };

  render() {
    const { lang, expand, expandDisabled, toggleExpand, resetAll } = this.props;

    return (
      <div className="set-btns flex">
        <Button
          className="col-2 col-4"
          variant="contained"
          onClick={this.toggleDrawer}
        >
          <ChevronRight />
        </Button>

        <Button className="col-2 col-4" variant="contained" disabled>
          mode
        </Button>

        <Button
          className="col-2 col-4"
          variant="contained"
          disabled={expandDisabled}
          onClick={toggleExpand}
        >
          {expand ? <ExpandLess /> : <ExpandMore />}
        </Button>

        <Button className="col-2 col-4" variant="contained" onClick={resetAll}>
          {translate('reset', lang)}
        </Button>

        <NavDrawer open={this.state.open} toggleDrawer={this.toggleDrawer} />
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
