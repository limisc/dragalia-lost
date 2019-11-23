import React from 'react';
import { connect } from 'react-redux';
import { setPanel } from 'actions';
import { Checkbox } from 'components';
import ItemPanel from './ItemPanel';
import HalidomPanel from './HalidomPanel';

function Col3({ adventurer, lang, panel, setPanel }) {
  const disabled = adventurer === null;

  return (
    <div id="stats-col3">
      <div>
        <Checkbox
          disabled={disabled}
          checked={panel}
          lang={lang}
          value="halidom"
          setChecked={setPanel}
        />
      </div>

      {panel ? <HalidomPanel /> : <ItemPanel lang={lang} />}
    </div>
  );
}

const mapStateToProps = ({ items, panel }) => {
  return {
    panel,
    adventurer: items.adventurer,
  };
};

const actionCreators = {
  setPanel,
};

export default connect(mapStateToProps, actionCreators)(Col3);
