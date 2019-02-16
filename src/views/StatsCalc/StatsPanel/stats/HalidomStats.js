import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TdItem from './TdItem';

import { translate, setSection } from "actions";

const mapStateToProps = (state) => {
  return {
    language: state.language,
    stats: state.stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSection: () => dispatch(setSection("halidom")),
  };
}

class HalidomStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { language, stats: { adventurer, dragon } } = this.props;
    let element = "", weapon = "";
    if (adventurer) {
      element = `element_${adventurer.element}`;
      weapon = `type_${adventurer.type}`;
    }
    const fafnir = dragon ? `dragon_${dragon.element}` : "";
    return (
      <Fragment>
        {(adventurer || dragon) &&
          <table className="ui unstackable fixed table">
            <thead>
              <tr>
                <th className="five wide column">
                  <button className="ui button" onClick={this.props.setSection}>{translate("setting", language)}</button>
                </th>
                <th>{translate("HP", language) + " %"}</th>
                <th>{translate("STR", language) + " %"}</th>
              </tr>
            </thead>

            <tbody>
              {adventurer &&
                <Fragment>
                  <TdItem field="element" image={element} />
                  <TdItem field="weapon" image={weapon} />
                </Fragment>
              }
              {dragon && <TdItem field="dragon" image={fafnir} />}
            </tbody>
          </table>
        }
      </Fragment>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HalidomStats);