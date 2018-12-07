import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStatusLevel } from '../../../../../../redux/actions/actions';
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

  render() {
    const { section, statusSets: { [section]: status } } = this.props;
    const disable = status ? false : true;
    return (
      <div className="field">
        <button id="max-btn" className="ui button" disabled={disable} onClick={this._onClick}>MAX LV.</button>
      </div>
    );
  }

  _onClick() {
    const { section, toMaxLevel } = this.props;
    toMaxLevel(section);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaxLevelButton);