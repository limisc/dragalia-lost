import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatsPanel from './statsPanel/StatsPanel';
import SelectPanel from './selectPanel/SelectPanel';
import DetailsPanel from './detailsPanel/DetailsPanel';
import { setLanguage, resetStats } from '../../redux/actions/actions'
const mapStateToProps = (state) => {
  return {
    language: state.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (language) => dispatch(setLanguage(language)),
    resetStats: () => dispatch(resetStats()),
  }
}

class StatsCalc extends Component {
  constructor(props) {
    super(props);
    this._setLanguage = this._setLanguage.bind(this);
  }

  render() {
    const { language } = this.props;
    return (
      <div className="ui doubling stackable two column grid" style={{ margin: "1em" }}>
        <div className="four wide column">
          {/* <div className="row"> */}
          <div className="ui form">
            <div className="fields">
              <div className="field">
                <select value={language} onChange={this._setLanguage}>
                  <option value="en">English</option>
                  <option value="zh">简中</option>
                </select>
              </div>

              <div className="field" style={{ float: "right !important" }}>
                <button className="ui button" style={{ float: "right !important" }} onClick={this.props.resetStats}>Reset</button>
              </div>
            </div>
            {/* </div> */}
          </div>
          <DetailsPanel
          />
        </div>
        <div className="six wide column">
          <StatsPanel />
        </div>
        <div className="five wide column">
          <SelectPanel />
        </div>
      </div >
    );
  }

  _setLanguage(e) {
    const { setLanguage } = this.props;
    setLanguage(e.target.value);
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsCalc);