import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Stats from './stats/Stats';
import HalidomStats from './stats/HalidomStats';

import { setSection } from '../../../redux/actions/actions';

import ui_content from '../../../redux/store/data/ui_content';

const mapStateToProps = (state) => {
  const { language, stats: { adventurer, dragon } } = state;
  return {
    language,
    adventurer,
    dragon,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(setSection("halidom")),
  }
}

class StatsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: ["adventurer", "weapon", "wyrmprint", "dragon"],
      halidom: ["element", "weaponType", "fafnir"],
    }
  }

  render() {
    const { sections } = this.state;
    const { language, adventurer, dragon } = this.props;
    return (
      <Fragment>
        {sections.map(section =>
          <Stats
            key={section}
            section={section}
          />
        )}
        <div className="ui divider"></div>

        {(adventurer || dragon) &&
          <table className="ui unstackable fixed table">
            <thead>
              <tr>
                <th className="four wide column"><button className="ui button" onClick={this.props.onClick}>{ui_content["setting"][language]}</button></th>
                <th>HP %</th>
                <th>STR %</th>
              </tr>
            </thead>
            <tbody>
              {adventurer &&
                <Fragment>
                  <HalidomStats
                    field="element"
                  />
                  <HalidomStats
                    field="weaponType"
                  />
                </Fragment>
              }
              {dragon &&
                <HalidomStats
                  field="fafnir"
                />
              }
            </tbody>
          </table>
        }
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsPanel);