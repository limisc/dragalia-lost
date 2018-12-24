import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleSection } from '../../../../redux/actions/actions';
import ui from '../../../../redux/store/data/ui_data';
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
      Name = ui[section],
    } = stats[section] || {};

    return (
      <div className="five wide column">
        <img
          className="status-avatar"
          alt={image}
          src={`${process.env.PUBLIC_URL}/image/${section}/${image}`}
          onClick={this._onClick}
        />
        <p style={{ textAlign: "center" }}><b>{Name[language]}</b></p>
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