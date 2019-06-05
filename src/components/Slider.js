import React from 'react';
import sizeMe from 'react-sizeme';
import classNames from 'classnames';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    let value = props.value != null ? props.value : props.defaultValue;
    value = this.trimValue(value);
    this.state = {
      value,
      index: -1,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.value) {
      return {
        value: nextProps.value,
      };
    }

    return null;
  }

  getBounds = () => {
    const {
      handleSize,
      size: { width },
    } = this.props;
    return width - handleSize - 2;
  };

  alignValue = val => {
    const { min, max, step } = this.props;

    const stepPos = (val - min) % step;
    let newVal = val - stepPos;

    if (Math.abs(stepPos) * 2 >= step) {
      newVal += stepPos > 0 ? step : -step;
    }

    if (newVal < min) newVal = min;
    if (newVal > max) newVal = max;

    return newVal;
  };

  trimValue = value => {
    const { min, max } = this.props;
    if (value[0] <= value[1] && value[0] >= min && value[1] <= max) {
      return value;
    }

    return value.map(v => Math.min(max, Math.max(min, v)));
  };

  calcOffset = val => {
    const { min, max } = this.props;
    const range = max - min;

    if (range === 0) {
      return 0;
    }

    const ratio = (val - min) / range;
    return ratio * this.getBounds();
  };

  getEventMap = mode => {
    const eventMap = {
      mouse: {
        mousemove: this.onMouseMove,
        mouseup: this.onMouseUp,
      },
      touch: {
        touchmove: this.onTouchMove,
        touchend: this.onTouchEnd,
      },
    };
    return eventMap[mode];
  };

  setHandler = (type, mode) => {
    const eventMap = this.getEventMap(mode);
    if (type === 'add') {
      Object.keys(eventMap).forEach(e => {
        document.addEventListener(e, eventMap[e]);
      });
    } else if (type === 'remove') {
      Object.keys(eventMap).forEach(e => {
        document.removeEventListener(e, eventMap[e]);
      });
    }
  };

  onMouseDown = index => e => {
    if (e.button !== 0 || this.props.disabled) return;
    this.onStart(index, e.pageX);
    this.setHandler('add', 'mouse');
    e.stopPropagation();
    e.preventDefault();
  };

  onTouchStart = index => e => {
    if (e.touches.length > 1 || this.props.disabled) return;
    this.onStart(index, e.touches[0].pageX);
    this.setHandler('add', 'touch');
    e.stopPropagation();
  };

  onStart = (index, pos) => {
    this.setState(state => ({
      index,
      startVal: state.value[index],
      startPos: pos || state.startPos,
    }));
  };

  onMouseMove = e => {
    const val = this.getValFromPos(e.pageX);
    this.moveTo(val);
  };

  onMouseUp = () => {
    this.setHandler('remove', 'mouse');
  };

  onTouchMove = e => {
    if (e.touches.length > 1) return;

    e.stopPropagation();
    e.preventDefault();
    const val = this.getValFromPos(e.touches[0].pageX);
    this.moveTo(val);
  };

  onTouchEnd = () => {
    this.setHandler('remove', 'touch');
  };

  getValFromPos = pos => {
    const { min, max } = this.props;
    const { startVal, startPos } = this.state;
    const diffPos = pos - startPos;

    const diffVal = (diffPos * (max - min)) / this.getBounds();
    return this.alignValue(startVal + diffVal);
  };

  moveTo = val => {
    const value = [...this.state.value];
    value[this.state.index] = val;
    value.sort((a, b) => a - b);
    const index = value.indexOf(val);

    const { props } = this;
    if (props.value && props.onChange) {
      this.setState({ index });
      this.props.onChange(value, props.index);
    } else {
      this.setState({ index, value });
    }
  };

  renderHandles = value => {
    return value.map((v, i) => {
      const left = this.calcOffset(v);
      const style = {
        left: `${left}px`,
        width: `${this.props.handleSize}px`,
        zIndex: this.state.index === i ? 2 : 1,
      };

      const className = `slider-handle slider-handle-${i}`;
      return (
        <div
          key={`handle-${i}`}
          className={className}
          style={style}
          onMouseDown={this.onMouseDown(i)}
          onTouchStart={this.onTouchStart(i)}
          tabIndex={0}
        >
          {v}
        </div>
      );
    });
  };

  render() {
    const { value } = this.state;
    const handles = this.renderHandles(value);
    const left = this.calcOffset(value[0]);
    const right = this.getBounds() - this.calcOffset(value[1]);
    const style = { left, right };
    const className = classNames('slider', this.props.className);
    return (
      <div className={className}>
        <div className="slider-rail" />
        <div className="slider-track" style={style} />
        {handles}
      </div>
    );
  }
}

Slider.defaultProps = {
  min: 0,
  max: 30,
  step: 1,
  defaultValue: [0, 30],
  handleSize: 30,
  disabled: false,
};

export default sizeMe()(Slider);
