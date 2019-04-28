/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { getLimit, updateHalidom } from 'actions';
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
      <div className="highlight flex">
        <div className="facility-image">
          <Image size="lg" field="facility" image={id} />
        </div>

        <div className="facility-name ellipsis">{name}</div>

        <div className="facility-icon">{level}</div>

        <div className="facility-icon">
          <Image
            size="sm"
            field="icon"
            image="minus"
            onClick={this.levelDecrement}
          />
        </div>

        <div className="facility-slider">
          <Slider max={this.state.max} level={level} onChange={this.onChange} />
        </div>

        <div className="facility-icon">
          <Image
            size="sm"
            field="icon"
            image="plus"
            onClick={this.levelIncrement}
          />
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
    updateHalidom: (fKey, sKey, iKey, level) =>
      dispatch(updateHalidom(fKey, sKey, iKey, level)),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Item)
);
