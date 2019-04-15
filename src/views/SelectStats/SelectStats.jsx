// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import FilterStats from "./FilterStats";
import StatsList from "./StatsList";

class SelectStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFields: {
        adventurer: ["weapon", "element", "rarity"],
        weapon: ["weapon", "rarity"],
        wyrmprint: ["rarity"],
        dragon: ["element", "rarity"],
      },
    };
  }

  render() {
    const {
      lang,
      section,
    } = this.props;

    const { [section]: fields } = this.state.filterFields;

    return (
      <Fragment>
        <FilterStats
          lang={lang}
          fields={fields}
        />
        <StatsList
          key={section}
          lang={lang}
          fields={fields}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ section }) => {
  return {
    section,
  };
}

export default connect(
  mapStateToProps,
)(SelectStats);