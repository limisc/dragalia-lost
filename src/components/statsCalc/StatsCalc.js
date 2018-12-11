import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatsPanel from './statsPanel/StatsPanel';
import SelectPanel from './selectPanel/SelectPanel';
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


class StatsCalc extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div id="left-panel" className="nine wide column">
          {/* <DetailsPanel />
          <div className="ui divider"></div> */}
          <StatsPanel />
        </div>

        <div id="right-panel" className="six wide column">
          {/* <button className="ui violet button" onClick={this._onClick}>Calc Details</button> */}
          {/* <div className="ui divider"></div> */}
          <SelectPanel />
        </div>
      </div>
    );
  }

  _onClick() {
    // const { statusSets, handleDetails } = this.props;
    // handleDetails(statusSets);
  }
};


// StatusCalc.propTypes = {
//   showDetails: PropTypes.bool.isRequired,
//   toggleDetails: PropTypes.func.isRequired,
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsCalc);