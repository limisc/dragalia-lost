import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatsPanel from './statsPanel/StatsPanel';
import SelectPanel from './selectPanel/SelectPanel';
import DetailsPanel from './detailsPanel/DetailsPanel';
import { setLanguage } from '../../redux/actions/actions'
const mapStateToProps = (state) => {
  return {
    language: state.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (language) => dispatch(setLanguage(language)),
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
        <div className="six wide column">
          <StatsPanel />
        </div>
        <div className="four wide column">
          <div className="ui form">
            <div className="fields">
              <div className="field">
                <select value={language} onChange={this._setLanguage}>
                  <option value="en">English</option>
                  <option value="zh">简中</option>
                </select>
              </div>
            </div>
          </div>
          <DetailsPanel
          />
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