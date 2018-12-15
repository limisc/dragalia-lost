import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatStatsValue } from '../../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  return {
    stats: state.stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUnbind: (section, value) => dispatch(updatStatsValue(section, "unbind", value)),
  }
}

class UnbindItem extends Component {
  constructor(props) {
    super(props);

    this._unbindDecrement = this._unbindDecrement.bind(this);
    this._unbindIncrement = this._unbindIncrement.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  // }
  render() {
    const { section, stats: { [section]: item } } = this.props;
    const { unbind = 4 } = item || {};
    return (
      <div className="unbind-set">
        {item &&
          <Fragment>
            <img
              className="unbind-set"
              alt="left-icon"
              src={`${process.env.PUBLIC_URL}/image/icon/left-icon.png`}
              onClick={this._unbindDecrement}
            />
            <img
              className="unbind-set"
              alt="unbind_image"
              src={`${process.env.PUBLIC_URL}/image/unbind/${unbind}_Unbind.png`}
            />
            <img
              className="unbind-set"
              alt="right-icon"
              src={`${process.env.PUBLIC_URL}/image/icon/right-icon.png`}
              onClick={this._unbindIncrement}
            />
          </Fragment>
        }
      </div>
    );
  }

  _unbindDecrement() {
    const { section, stats: { [section]: { unbind } }, updateUnbind } = this.props;
    if (unbind > 0) {
      updateUnbind(section, -1);
    }
  }
  _unbindIncrement() {
    const { section, stats: { [section]: { unbind } }, updateUnbind } = this.props;
    if (unbind < 4) {
      updateUnbind(section, 1);
    }
  }
}

UnbindItem.propTypes = {
  //props
  section: PropTypes.string.isRequired,
  //redux
  stats: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnbindItem);