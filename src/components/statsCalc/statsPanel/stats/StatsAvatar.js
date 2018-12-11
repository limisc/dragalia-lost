import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleSection } from '../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  return {
    language: state.language,
    stats: state.stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSection: (section) => dispatch(handleSection(section)),
  }
}

class StatsAvatar extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }


  render() {
    const { language, section, stats } = this.props;
    const {
      image = "add.png",
      Name,
    } = stats[section] || {};
    const avatarName = Name ? Name[language] : (section.charAt(0).toUpperCase() + section.slice(1));

    return (
      <div className="six wide column">
        <img
          className="status-avatar"
          alt={image}
          src={`${process.env.PUBLIC_URL}/image/${section}/${image}`}
          onClick={this._onClick}
        />
        <p style={{ textAlign: "center" }}><b>{avatarName}</b></p>
      </div>
    );
  }

  _onClick() {
    const { section, handleSection } = this.props;
    handleSection(section);
  }
}

StatsAvatar.propTypes = {
  section: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  handleSection: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsAvatar);