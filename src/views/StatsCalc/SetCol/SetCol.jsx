//@flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { selectPanel } from 'appRedux/actions';
import SetHalidom from './SetHalidom';
import SelectStats from './SelectStats';
import NavButtons from './NavButtons';

class SetCol extends Component {
  // TODO Change to func
  render() {
    const { panel } = this.props;
    return (
      <Fragment>
        <NavButtons panel={panel} onClick={this.onClick} />
        {panel === '1' ? <SetHalidom /> : <SelectStats />}
      </Fragment>
    );
  }

  onClick = e => {
    this.props.selectPanel(e.currentTarget.id);
  };
}

const mapStateToProps = ({ panel }) => {
  return { panel };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPanel: panel => dispatch(selectPanel(panel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetCol);
