import React, { Component } from 'react';
import { connect } from 'react-redux';
// import DetailItem from './DetailItem';
import uuidv4 from 'uuid/v4';
import ui_content from '../../../redux/store/data/ui_content';

function mapStateToProps(state) {
  const { language, stats, halidom, details } = state;
  return {
    language,
    stats,
    halidom,
    details
  };
}

class DetailsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: ["adventurer", "weapon", "wyrmprint", "dragon", "ability", "halidom"],
    }
  }

  render() {
    const { language, details } = this.props;
    const total = this.calcTotal(details);
    return (
      <table className="ui unstackable violet celled table">
        <thead>
          <tr>
            <th></th>
            <th>HP</th>
            <th>STR</th>
          </tr>
        </thead>

        <tbody>
          {this.state.fields.map(field =>
            <tr key={uuidv4()}>
              <td>{ui_content[field][language]}</td>
              <td>{details[field].HP}</td>
              <td>{details[field].STR}</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th>{ui_content["total"][language]}</th>
            <th>{total.HP}</th>
            <th>{total.STR}</th>
          </tr>
        </tfoot>
      </table>
    );
  }

  calcTotal(details) {
    let HP = 0, STR = 0;
    for (let d in details) {
      if (details.hasOwnProperty(d)) {
        HP += details[d].HP;
        STR += details[d].STR;
      }
    }
    return { HP, STR };
  }
}
export default connect(
  mapStateToProps,
)(DetailsPanel);