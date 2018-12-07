import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateStatusUnbind } from '../../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  return {
    statusSets: state.statusSets,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStatusUnbind: (section, value) => dispatch(updateStatusUnbind(section, value)),
  }
}

class UnbindItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IMG_PATH: `${process.env.PUBLIC_URL}/img`
    }
    this._unbindDecrement = this._unbindDecrement.bind(this);
    this._unbindIncrement = this._unbindIncrement.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { section } = nextProps;
    const { unbind: nextUnbind = 4 } = nextProps.statusSets[section] || {};
    const { unbind = "" } = this.props.statusSets[section] || {};
    return nextUnbind !== unbind;
  }
  render() {
    const { section, statusSets: { [section]: status } } = this.props, { IMG_PATH } = this.state;
    const { unbind = 4 } = status || {};
    return (
      <div className="unbind-set">
        {status &&
          <Fragment>
            <img
              className="unbind-set"
              alt="left-icon"
              src={`${IMG_PATH}/icon/left-icon.png`}
              onClick={this._unbindDecrement}
            />
            <img
              className="unbind-set"
              alt="unbind_image"
              src={`${IMG_PATH}/unbind/${unbind}_Unbind.png`}
            />
            <img
              className="unbind-set"
              alt="right-icon"
              src={`${IMG_PATH}/icon/right-icon.png`}
              onClick={this._unbindIncrement}
            />
          </Fragment>
        }
      </div>
    );
  }

  _unbindDecrement() {
    const { section, statusSets: { [section]: { unbind } }, updateStatusUnbind } = this.props;
    if (unbind > 0) {
      updateStatusUnbind(section, -1);
    }
  }
  _unbindIncrement() {
    const { section, statusSets: { [section]: { unbind } }, updateStatusUnbind } = this.props;
    if (unbind < 4) {
      updateStatusUnbind(section, 1);
    }
  }
}

UnbindItem.propTypes = {
  //props
  section: PropTypes.string.isRequired,
  //redux
  statusSets: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnbindItem);