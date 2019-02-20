/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppContext } from "context";
import { selectSection } from "actions";
import { Image } from "components";

const mapStateToProps = (state) => {
  return {
    stats: state.stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectSection: (section) => dispatch(selectSection(section)),
  };
}

class StatsAvatar extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const { lang } = this.context;
    const { section, stats: { [section]: item } } = this.props;
    let image = "add";
    let label = section;
    if (item) {
      label = item.Name[lang];
      switch (section) {
        case "adventurer":
          image = item.Id + item.curRarity;
          break;
        case "wyrmprint":
        case "wyrmprint1":
        case "wyrmprint2":
          const unbind = parseInt(item.unbind, 10);
          image = unbind >= 2 ? item.Id + "2" : item.Id + "1";
          break;
        default:
          image = item.Id;
          break;
      }
    }
    return (
      <>
        <Image
          size="lg"
          statsKey={section}
          image={image}
          onClick={this._onClick}
        />
        {label}
      </>
    );
  }

  _onClick = () => {
    this.props.selectSection(this.props.section);
  }
}


StatsAvatar.propTypes = {
  section: PropTypes.string.isRequired,
}

StatsAvatar.contextType = AppContext;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsAvatar);