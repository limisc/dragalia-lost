import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectSection } from "actions";

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
    const { section, stats } = this.props;
    const { image = "add.png" } = stats[section] || {};
    return (

      <img
        className="l"
        alt={image}
        src={`${process.env.PUBLIC_URL}/image/${section}/${image}`}
        onClick={this._onClick}
      />
    );
  }

  _onClick = () => {
    this.props.selectSection(this.props.section);
  }
}


StatsAvatar.propTypes = {
  section: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsAvatar);