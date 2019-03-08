import React from 'react';
import { connect } from 'react-redux';
import SelectStats from "./SelectStats";

const TablePanel = ({ section }) => {
  if (section === "halidom") {
    return null;
  } else if (!!section) {
    return (
      <SelectStats
        section={section}
      />
    );
  }

  return null;
};

const mapStateToProps = ({ section }) => {
  return {
    section,
  };
}
export default connect(
  mapStateToProps,
)(TablePanel);