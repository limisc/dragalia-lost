/* eslint-disable no-unused-vars */
import React from 'react';
import { refs } from 'utils';
import { RadioBtns } from 'components';
import PanelHalidom from './PanelHalidom';
import PanelStats from './PanelStats';

const btns = ['stats', 'halidom'];

function Col3({ panel, setPanel }) {
  return (
    <div id="col3" ref={refs.col3}>
      <RadioBtns name="panel" checked={panel} btns={btns} onChange={setPanel} />
      {panel === 'stats' ? <PanelStats /> : <PanelHalidom />}
    </div>
  );
}

export default React.memo(Col3);
