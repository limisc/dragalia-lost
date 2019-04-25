/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import SelectStats from './SelectStats';

const SetCol = () => {
  return (
    <div className="column">
      <SelectStats />
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetCol);
