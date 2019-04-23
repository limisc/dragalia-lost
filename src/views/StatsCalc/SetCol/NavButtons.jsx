//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { withTheme } from 'components';
import { Button } from '@material-ui/core';
import { translate } from 'appRedux/actions';

class NavButtons extends React.PureComponent {
  render() {
    const { lang, panel, onClick } = this.props;

    return (
      <div className="flex">
        <Button
          id="0"
          variant="contained"
          className={panel === '0' ? 'col-2 active' : 'col-2'}
          onClick={onClick}
        >
          {translate('stats', lang)}
        </Button>

        <Button
          id="1"
          variant="contained"
          className={panel === '1' ? 'col-2 active' : 'col-2'}
          onClick={onClick}
        >
          {translate('facility', lang)}
        </Button>
      </div>
    );
  }
}

export default withTheme(NavButtons);
