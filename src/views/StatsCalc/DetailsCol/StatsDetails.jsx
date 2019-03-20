// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '@material-ui/core';
import { translate } from "actions";

const propTypes = {
  open: PropTypes.bool,
  lang: PropTypes.string,
  label: PropTypes.string,
  details: PropTypes.object,
  onClick: PropTypes.func,
};

class StatsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        "adventurer",
        "weapon",
        "wyrmprint1",
        "wyrmprint2",
        "dragon",
        "ability",
        "halidom"
      ],
      open: true,
    };
  }

  render() {
    const {
      lang,
      label,
      details,
    } = this.props;

    const { rows, open } = this.state;

    const {
      HP: tHP = 0,
      STR: tSTR = 0,
      might: tMight = 0,
    } = details.total || {};

    const cursor = open ? "n-resize" : "s-resize";
    return (
      <div className="details-container">
        <div
          className="details-row"
          style={{ cursor }}
          onClick={this.onClick}
        >
          <div className="f-col details-header"><strong>{label}</strong></div>
          <div className="r-col details-header">{translate("HP", lang)}</div>
          <div className="r-col details-header">{translate("STR", lang)}</div>
          <div className="r-col details-header">{translate("might", lang)}</div>
        </div>
        <Collapse in={open} unmountOnExit>
          <div className="collapse-div">
            {rows.map((row) => {
              let { HP = 0, STR = 0, might = 0 } = details[row] || {};
              return (
                <div className="details-row" key={row}>
                  <div className="f-col">{translate(row, lang)}</div>
                  <div className="r-col">{HP}</div>
                  <div className="r-col">{STR}</div>
                  <div className="r-col">{might}</div>
                </div>
              );
            })}
          </div>
        </Collapse>
        <div className="details-total">
          <div className="f-col">{translate("total", lang)}</div>
          <div className="r-col">{tHP}</div>
          <div className="r-col">{tSTR}</div>
          <div className="r-col">{tMight}</div>
        </div>
      </div>
    );
  }

  onClick = () => {
    this.setState(state => ({ open: !state.open }));
  }
}

StatsDetails.propTypes = propTypes;

export default StatsDetails;