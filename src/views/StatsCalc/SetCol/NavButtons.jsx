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
      <div className="fluid flex">
        <div className="col-2">
          <Button
            id="0"
            variant="contained"
            className={panel === '0' ? 'active' : ''}
            onClick={onClick}
          >
            {translate('stats', lang)}
          </Button>
        </div>

        <div className="col-2">
          <Button
            id="1"
            variant="contained"
            className={panel === '1' ? 'active' : ''}
            onClick={onClick}
          >
            {translate('facility', lang)}
          </Button>
        </div>
      </div>
    );
  }
}

export default withTheme(NavButtons);
