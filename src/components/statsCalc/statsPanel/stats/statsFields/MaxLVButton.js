import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatStatsValue } from '../../../../../redux/actions/actions';
const mapStateToProps = (state) => {
  return {
    stats: state.stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toMaxLevel: (section) => dispatch(updatStatsValue(section, "level", "100")),
  }
}

class MaxLevelButton extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   const { section } = nextProps;
  //   const { Id: nextId = "" } = nextProps.statusSets[section] || {};
  //   const { Id = "" } = this.props.statusSets[section] || {};
  //   return nextId !== Id;
  // }

  render() {
    const { section, stats: { [section]: item } } = this.props;
    // console.log("MAXLV", section)
    return (
      <div className="field">
        <label>&nbsp;</label>
        <button id="max-btn" className="ui button" disabled={!item} onClick={this._onClick}>MAX</button>
      </div>
    );
  }

  _onClick() {
    const { section, toMaxLevel } = this.props;
    toMaxLevel(section);
  }
}


MaxLevelButton.propTypes = {
  //props
  section: PropTypes.string.isRequired,
  //redux store
  stats: PropTypes.object.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaxLevelButton);