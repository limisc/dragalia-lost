import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailItem from './DetailItem';
import uuidv4 from 'uuid/v4';

function mapStateToProps(state) {
  return {
    details: state.details,
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
    const { details } = this.props;
    const total = this.calcTotal(details);
    return (
      <table className="ui violet celled table">
        <thead>
          <tr>
            <th>Field</th>
            <th>HP</th>
            <th>STR</th>
            {/* <th>Diff</th> */}
          </tr>
        </thead>

        <tbody>
          {this.state.fields.map(field => {
            return (
              <DetailItem
                key={uuidv4()}
                label={field}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>{total.HP}</th>
            <th>{total.STR}</th>
          </tr>
        </tfoot>
      </table>
    );
  }

  calcTotal(details) {
    const total = { HP: 0, STR: 0 };
    Object.keys(details).forEach(key => {
      total.HP += details[key].HP;
      total.STR += details[key].STR;
    });
    return total;
  }
}
export default connect(
  mapStateToProps,
)(DetailsPanel);