import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import StatusPanel from './statusPanel/StatusPanel';
import SelectPanel from './selectPanel/SelectPanel';
import DetailsPanel from './detailsPanel/DetailsPanel';
import { handleDetails } from '../../redux/actions/actions'

const mapStateToProps = (state) => {
  return {
    // showDetails: state.showDetails,
    statusSets: state.statusSets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleDetails: () => dispatch(toggleDetails()),
    handleDetails: (statusSets) => dispatch(handleDetails(statusSets)),
  }
}


class StatusCalc extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    // const { showDetails } = this.props;
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div id="left-panel" className="nine wide column">
          <DetailsPanel />
          <div className="ui divider"></div>
          <StatusPanel />
        </div>

        <div id="right-panel" className="six wide column">
          <button className="ui violet button" onClick={this._onClick}>Calc Details</button>
          <div className="ui divider"></div>
          <SelectPanel />
        </div>
      </div>
    );
  }

  _onClick() {
    const { statusSets, handleDetails } = this.props;
    handleDetails(statusSets);
  }
};


// StatusCalc.propTypes = {
//   showDetails: PropTypes.bool.isRequired,
//   toggleDetails: PropTypes.func.isRequired,
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusCalc);