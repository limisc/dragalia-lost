import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { hanldeSection } from '../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  const { UIData: { IMG_PATH }, statusSets } = state;
  return {
    IMG_PATH,
    statusSets,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    hanldeSection: (section, statusSets) => dispatch(hanldeSection(section, statusSets)),
  };
}


class StatusAvatar extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const { IMG_PATH, section, statusSets: { [section]: status } } = this.props;
    let {
      img = "icon/add.png",
      Name = section.charAt(0).toUpperCase() + section.slice(1).toLowerCase(),
    } = status || {};

    return (
      <Fragment>
        <img
          className="status-avatar"
          alt={img}
          src={`${IMG_PATH}/${img}`}
          onClick={this._onClick}
        />
        <p style={{ textAlign: "center" }}><b>{Name}</b></p>
      </Fragment >
    );
  }

  _onClick() {
    const { section, statusSets, hanldeSection } = this.props;
    hanldeSection(section, statusSets);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusAvatar);