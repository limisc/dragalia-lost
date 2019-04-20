//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { getLimit, updateHalidom } from 'appRedux/actions';
import { Image, withTheme } from 'components';
import names from 'locales/facility';
import Slider from './Slider';

class Item extends React.Component {
  constructor(props) {
    super(props);
    const { type } = props.item;
    this.state = { max: getLimit(type) };
  }

  render() {
    const {
      lang,
      item: { id, level },
    } = this.props;
    const name = names[id][lang] || names[id].en;

    return (
      <div className="list-item flex">
        <div className="facility-item-image">
          <Image size="lg" dir="facility" image={id} />
        </div>

        <div className="facility-item-name ellipsis">{name}</div>

        <div className="facility-item-icon">{level}</div>

        <div className="facility-item-icon">
          <Image size="sm" dir="icon" image="minus" onClick={this.levelDecrement} />
        </div>

        <div className="facility-item-slider">
          <Slider max={this.state.max} level={level} onChange={this.onChange} />
        </div>

        <div className="facility-item-icon">
          <Image size="sm" dir="icon" image="plus" onClick={this.levelIncrement} />
        </div>
      </div>
    );
  }

  onChange = ({ target: { value } }) => {
    // TODO async range slide
    // let { timer } = this.state;
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    // }, 500);
    // this.setState({ timer });
    const { fKey, sKey, iKey, updateHalidom } = this.props;
    updateHalidom(fKey, sKey, iKey, value * 1);
  };

  // TODO simplify two func
  levelDecrement = () => {
    const {
      fKey,
      sKey,
      iKey,
      updateHalidom,
      item: { level },
    } = this.props;
    const intLV = level * 1 - 1;
    if (intLV >= 0) {
      updateHalidom(fKey, sKey, iKey, intLV);
    }
  };

  levelIncrement = () => {
    const {
      fKey,
      sKey,
      iKey,
      updateHalidom,
      item: { level },
    } = this.props;
    const intLV = level * 1 + 1;
    if (intLV <= this.state.max) {
      updateHalidom(fKey, sKey, iKey, intLV);
    }
  };
}

const mapStateToProps = ({ sync, halidom }) => {
  return {
    sync,
    halidom,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHalidom: (fKey, sKey, iKey, level) => dispatch(updateHalidom(fKey, sKey, iKey, level)),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Item)
);
