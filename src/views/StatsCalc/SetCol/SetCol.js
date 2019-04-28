/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { selectPanel } from 'actions';
import NavPanel from './NavPanel';

import SelectStats from './SelectStats';
import SetHalidom from './SetHalidom';

const SetCol = ({ panel, selectPanel }) => {
  const onClick = e => selectPanel(e.currentTarget.name);

  return (
    <div className="column">
      <NavPanel panel={panel} onClick={onClick} />
      {panel === '1' ? <SetHalidom /> : <SelectStats />}
    </div>
  );
};

const mapStateToProps = ({ panel }) => {
  return { panel };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPanel: panel => dispatch(selectPanel(panel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetCol);
