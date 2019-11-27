import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetItems } from 'actions';
import { Checkbox } from 'components';
import StatsTable from './StatsTable';
import Dungeon from './Dungeon';

function Col1({ adventurer, lang, resetItems }) {
  const [expend, setExpend] = useState(false);
  const disabled = adventurer === null;
  return (
    <div>
      <div className="grid-2">
        <Checkbox
          icon
          lang={lang}
          disabled={disabled}
          value="dragon_Shadow"
          title="Details"
          checked={expend}
          setChecked={setExpend}
        />
        <button type="button" onClick={resetItems}>
          reset
        </button>
      </div>
      {adventurer && (
        <>
          <StatsTable lang={lang} expend={expend} />
          {!expend && <Dungeon lang={lang} />}
        </>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  const { adventurer } = state.items;
  return { adventurer };
};

const actionCreators = {
  resetItems,
};

export default connect(mapStateToProps, actionCreators)(Col1);
