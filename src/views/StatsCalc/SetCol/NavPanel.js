/* eslint-disable no-unused-vars */
import React, { memo, useContext } from 'react';
import { Button } from '@material-ui/core';
import { translate } from 'actions';
import { Context } from 'components';
import classNames from 'classnames';

const NavPanel = memo(({ panel, onClick }) => {
  const { lang } = useContext(Context);
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
});

export default NavPanel;
