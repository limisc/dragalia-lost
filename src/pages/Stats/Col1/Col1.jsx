import React, { useState } from 'react';
import { connect } from 'react-redux';
import StatsTable from './StatsTable';
import Dungeon from './Dungeon';

function Col1({ adventurer, lang }) {
  const [expend, setExpend] = useState(false);

  return (
    <div>
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

export default connect(mapStateToProps)(Col1);
