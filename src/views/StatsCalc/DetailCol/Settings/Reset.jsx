//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withTheme } from 'components';
import { reset, translate } from 'appRedux/actions';

class Reset extends React.PureComponent {
  render() {
    const { lang, reset } = this.props;

    return (
      <Button variant="contained" className="col-2" onClick={reset}>
        {translate('reset', lang)}
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // TODO clear
    reset: () => dispatch(reset()),
  };
};

export default withTheme(
  connect(
    null,
    mapDispatchToProps
  )(Reset)
);
