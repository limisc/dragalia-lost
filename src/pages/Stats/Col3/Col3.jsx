import React from 'react';
import { connect } from 'react-redux';
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

      {panel ? (
        <HalidomPanel />
      ) : (
        <ItemPanel lang={lang} panel={panel} setPanel={setPanel} />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    adventurer: state.items.adventurer,
  };
};

export default connect(mapStateToProps)(Col3);
