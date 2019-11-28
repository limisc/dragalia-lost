import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetItems } from 'actions';
import StatsTable from './StatsTable';
import Dungeon from './Dungeon';

function Col1({ adventurer, lang, resetItems }) {
  const [expend, setExpend] = useState(false);
  return (
    <div>
      <div className="grid-2">
        <button type="button" onClick={resetItems}>
          save
        </button>
        <button type="button" onClick={resetItems}>
          reset
        </button>
      </div>
      {adventurer && (
        <>
          <StatsTable
            disabled={adventurer === null}
            lang={lang}
            expend={expend}
            setExpend={setExpend}
          />
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

const mapDispatchToProps = {
  resetItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Col1);
