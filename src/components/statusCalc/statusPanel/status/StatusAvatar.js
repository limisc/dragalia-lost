import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleSection } from '../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  const { statusSets } = state;
  return {
    statusSets
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSection: (section, statusSets) => dispatch(handleSection(section, statusSets)),
  }
}

class StatusAvatar extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { section } = nextProps;
    const { img: nextImg = "" } = nextProps.statusSets[section] || {};
    const { img = "" } = this.props.statusSets[section] || {};
    return nextImg !== img;
  }

  render() {
    const { section, statusSets: { [section]: status } } = this.props;
    const {
      img = "icon/add.png",
      Name = section.charAt(0).toUpperCase() + section.slice(1).toLowerCase(),
    } = status || {};
    console.log("StatusAvatar", section)
    return (
      <Fragment>
        <img
          className="status-avatar"
          alt={img}
          src={`${process.env.PUBLIC_URL}/img/${img}`}
          onClick={this._onClick}
        />
        <p style={{ textAlign: "center" }}><b>{Name}</b></p>
      </Fragment >
    );
  }

  _onClick() {
    const { section, statusSets, handleSection } = this.props;
    handleSection(section, statusSets);
  }
}

StatusAvatar.propTypes = {
  section: PropTypes.string.isRequired,
  statusSets: PropTypes.object.isRequired,
  handleSection: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusAvatar);