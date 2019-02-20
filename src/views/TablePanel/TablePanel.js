import React from 'react';
import { connect } from 'react-redux';
import SelectStats from "./SelectStats";
import SettingHalidom from "./SettingHalidom";

const mapStateToProps = (state) => {
  return {
    focusSection: state.focusSection
  };
}

const SelectPanel = ({ focusSection }) => {
  if (focusSection === "halidom") {
    return <SettingHalidom />
  } else if (focusSection) {
    return <SelectStats />
  }
  return null;
};


export default connect(
  mapStateToProps,
)(SelectPanel);