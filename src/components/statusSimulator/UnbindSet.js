import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UnbindSet extends Component {
  constructor(props) {
    super(props);

    this._unbindIncrement = this._unbindIncrement.bind(this);
    this._unbindDecrement = this._unbindDecrement.bind(this);
  }

  render() {
    const { IMG_PATH, unbind } = this.props;

    return (
      <div className="unbind-set">
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
      </div>
    );
  }

  _unbindIncrement() {
    this.props.updateValue("unbind", "1");
  }

  _unbindDecrement() {
    this.props.updateValue("unbind", "-1")
  }
}

UnbindSet.propTypes = {
  IMG_PATH: PropTypes.string,
  unbind: PropTypes.number,
};

export default UnbindSet;