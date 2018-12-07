import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateStatusUnbind } from '../../../../../redux/actions/actions';

function mapStateToProps(state) {
  const { UIData: { IMG_PATH }, statusSets } = state;
  return {
    IMG_PATH,
    statusSets,
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
    this._unbindDecrement = this._unbindDecrement.bind(this);
    this._unbindIncrement = this._unbindIncrement.bind(this);
  }

  render() {
    const { IMG_PATH, section, statusSets: { [section]: status } } = this.props;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnbindItem);