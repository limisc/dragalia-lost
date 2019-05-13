/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Clear } from '@material-ui/icons';
import { getLimit, translate, updateHalidom, delHalidom } from 'actions';
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
      item: { id, type, level },
    } = this.props;
    const name = names[id]
      ? names[id][lang] || names[id].en
      : translate(type, lang);

    return (
      <div className="highlight flex">
        <div className="facility-image">
          {id === 'SIMC' ? (
            <Clear
              style={{ fontSize: '80px', cursor: 'pointer' }}
              onClick={this.onClick}
            />
          ) : (
            <Image size="lg" field="facility" image={id} />
          )}
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

  onClick = () => {
    const { fKey, sKey, iKey, delHalidom } = this.props;
    delHalidom(fKey, sKey, iKey);
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

const mapStateToProps = ({ halidom }) => {
  return { halidom };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHalidom: (fKey, sKey, iKey, level) =>
      dispatch(updateHalidom(fKey, sKey, iKey, level)),
    delHalidom: (fKey, sKey, iKey) => dispatch(delHalidom(fKey, sKey, iKey)),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Item)
);
