// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import FilterStats from "./FilterStats";
import StatsList from "./StatsList";

const propTypes = {

};

const defaultProps = {

};


class SelectStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFields: {
        adventurer: ["weapon", "element", "rarity"],
        weapon: ["weapon", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["element", "rarity"],
      },
    };
  }

  render() {
    const {
      section,
    } = this.props;

    const { [section]: fields } = this.state.filterFields;

    // if (section === "halidom") {
    //   return <SetHalidom />;
    // }

    return (
      <Paper style={{
        // height: "500px",
        height: "calc(100vh - 80px)",
        width: "100%",
        // flex: 1,
      }}>
        {/* <FilterStats
          fields={fields}
        /> */}
        {/* <ExpansionPanel>

          <ExpansionPanelSummary>
            Stats
          </ExpansionPanelSummary>

          <ExpansionPanelDetails
            style={{
              height: "calc(100vh - 150px)",
              padding: 0,
            }}
          >
            <StatsList
              fields={fields}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
        {/* <div
          className="stats-list"
          style={{ height: "50px" }}
        >
          <div className="stats-list-image">
          </div>

          <div className="stats-list-name">
            Name
          </div>

          {fields.map((field) => (
            <div key={field} className="stats-list-icon">
              {field}
            </div>
          ))}
        </div> */}
        <StatsList
          fields={fields}
        />
      </Paper>
    );
  }
}


SelectStats.propTypes = propTypes;
SelectStats.defaultProps = defaultProps;

const mapStateToProps = ({ section }) => {
  return {
    section,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //: () => dispatch(),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectStats);