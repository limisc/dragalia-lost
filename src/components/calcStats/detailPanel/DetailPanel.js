import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { translate } from "../../../redux/actions/actions";
const mapStateToProps = (state) => {
  const { language, stats, halidom, details } = state;
  return {
    language,
    stats,
    halidom,
    details
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

class DetailPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: ["adventurer", "weapon", "wyrmprint", "dragon", "ability", "halidom"],
      collapse: true,
    }
  }

  handleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse,
    })
  }
  render() {
    const { language, details } = this.props;
    const total = this.calcTotal(details);
    return (
      <Fragment>
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
              <tr key={field}>
                <td>{translate(field, language)}</td>
                <td>{details[field].HP}</td>
                <td>{details[field].STR}</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>{translate("total", language)}</th>
              <th>{total.HP}</th>
              <th>{total.STR}</th>
            </tr>
          </tfoot>
        </table>
      </Fragment>
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
  mapDispatchToProps,
)(DetailPanel);