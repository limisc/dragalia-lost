import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from "../../../../redux/actions/actions";

const mapStateToProps = (state) => {
  return {
    language: state.language,
    stats: state.stats,
  };
}

const StatsName = ({ language, section, stats, name }) => {
  let label;
  if (name) {
    label = name;
  } else if (stats[section]) {
    label = stats[section].Name;
  } else {
    label = section;
  }

  return (
    <p style={{ textAlign: "center" }}>{translate(label, language)}</p>
  );
};

StatsName.propTypes = {
  section: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
)(StatsName);