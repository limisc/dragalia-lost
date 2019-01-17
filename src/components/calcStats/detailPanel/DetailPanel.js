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
        <p style={{ textAlign: "left !important" }}>Current display bug in game: <br />
          - Stats in edit equipment page is lower than stats in detail page, <br />  - - reason: doesn't calc fafnir statue, <br />
          - Stats in detail page is lower than actual stats value, <br /> - - reason: doesn't multiply 1.5 for fafnir statue promotion when adventurer and dragon are the same element.
          <br />
          <br />
          Please file a report to customer support, thanks.
        </p>

        <button className="ui button" onClick={this.handleCollapse}>e.g.</button>
        {!this.state.collapse &&
          <Fragment>
            <p>fig 1 & fig2 HP: 1706 - 1679 = 27 <br/>
            fig2 & fig3 HP:  1720 - 1706 = 14 == ceil(27 * 0.5)
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/image/temp/1.jpg`}
              alt="1.jpg"
              style={{ width: '100%' }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/image/temp/2.jpg`}
              alt="2.jpg"
              style={{ width: '100%' }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/image/temp/3.jpg`}
              alt="3.jpg"
              style={{ width: '100%' }}
            />
          </Fragment>
        }
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