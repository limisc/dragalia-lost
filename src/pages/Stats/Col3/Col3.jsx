import React from 'react';
import { connect } from 'react-redux';
import { setPanel } from 'actions';
import { Checkbox } from 'components';
import Items from './Items';
import Halidom from './Halidom';

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

      {panel ? <Halidom /> : <Items lang={lang} />}
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
