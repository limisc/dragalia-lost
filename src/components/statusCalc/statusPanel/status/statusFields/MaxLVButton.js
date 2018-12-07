import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatusLevel } from '../../../../../redux/actions/actions';
const mapStateToProps = (state) => {
  const { statusSets } = state;
  return {
    statusSets
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toMaxLevel: (section) => dispatch(updateStatusLevel(section, "level", "100")),
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
    const { section, statusSets: { [section]: status } } = this.props;
    // console.log("MAXLV", section)
    return (
      <div className="field">
        <button id="max-btn" className="ui button" disabled={!status} onClick={this._onClick}>MAX LV.</button>
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
  statusSets: PropTypes.object.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaxLevelButton);