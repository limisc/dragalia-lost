import React from 'react';
import { connect } from 'react-redux';
import SelectStats from './SelectStats';
import SelectHalidom from './settingHalidom/SelectHalidom';

const mapStateToProps = (state) => {
  return {
    focusSection: state.focusSection
  };
}

const SelectPanel = ({ focusSection }) => {
  if (focusSection === "halidom") {
    return <SelectHalidom />
  } else if (focusSection) {
    return <SelectStats />
  }
  return null;
};


export default connect(
  mapStateToProps,
)(SelectPanel);