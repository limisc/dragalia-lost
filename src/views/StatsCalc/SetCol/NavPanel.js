/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from '@material-ui/core';
import { translate } from 'actions';
import { withTheme } from 'components';
import classNames from 'classnames';

class NavPanel extends React.PureComponent {
  render() {
    const { lang, panel, onClick } = this.props;
    const btn1 = classNames('col-2', { active: panel === '0' });
    const btn2 = classNames('col-2', { active: panel === '1' });
    return (
      <div className="flex">
        <Button name="0" variant="contained" className={btn1} onClick={onClick}>
          {translate('stats', lang)}
        </Button>

        <Button name="1" variant="contained" className={btn2} onClick={onClick}>
          {translate('facility', lang)}
        </Button>
      </div>
    );
  }
}

export default withTheme(NavPanel);
