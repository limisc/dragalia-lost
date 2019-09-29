/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { useEventCallback } from 'utils';

const asc = (a, b) => a - b;

function findClosest(values, currentValue) {
  const { index: closestIndex } = values.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);

    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index,
      };
    }

    return acc;
  }, null);
  return closestIndex;
}

const getPos = (event, touchId) => {
  if (touchId.current !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return touch.clientX;
      }
    }

    return null;
  }

  return event.clientX;
};

const trimValue = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;

  return value;
};

const pctToValue = (pct, min, max) => {
  let value = (max - min) * pct + min;
  value = trimValue(value, min, max);
  return Math.round(value);
};

const valueToPos = (value, min, max, width) => {
  return ((value - min) * width) / (max - min);
};

const setValue = ({ i, v, values }) => {
  const ret = [...values];
  ret[i] = v;
  return ret;
};

const defaultProps = {
  defaultValue: null,
  min: 0,
};

function Slider({ defaultValue, value: valueProp, min, max, onChange }) {
  const sliderRef = useRef();
  const [dimension, setDimension] = useState({
    left: 0,
    width: 0,
  });

  const handleWidth = useEventCallback(() => {
    if (sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      setDimension({ left, width: width - 32 });
    }
  });

  useEffect(() => {
    handleWidth();
  }, [handleWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, [handleWidth]);

  const { current: isControlled } = useRef(valueProp != null);
  const touchId = React.useRef();

  const [valueState, setValueState] = useState(defaultValue || [min, max]);

  const valueDerived = isControlled ? valueProp : valueState;
  const range = Array.isArray(valueDerived);
  let values = range ? [...valueDerived].sort(asc) : [valueDerived];
  values = values.map(v => trimValue(v, min, max));

  const prevIndex = React.useRef();

  const getNewValue = React.useCallback(
    (pos, move = false) => {
      const { left, width } = dimension;
      const pct = (pos - left) / width;
      const v = pctToValue(pct, min, max);
      const i = move ? prevIndex.current : findClosest(values, v);
      const newValue = setValue({ i, v, values }).sort(asc);
      prevIndex.current = newValue.indexOf(v);

      return newValue;
    },
    [values, min, max, dimension]
  );

  const handleTouchMove = useEventCallback(event => {
    const pos = getPos(event, touchId);

    if (!pos) return;
    const newValue = getNewValue(pos, true);

    if (!isControlled) {
      setValueState(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  });

  const handleTouchEnd = useEventCallback(event => {
    const pos = getPos(event, touchId);
    if (!pos) return;

    touchId.current = undefined;
    document.body.removeEventListener('mousemove', handleTouchMove);
    document.body.removeEventListener('mouseup', handleTouchEnd);
    // eslint-disable-next-line no-use-before-define
    document.body.removeEventListener('mouseenter', handleMouseEnter);
    document.body.removeEventListener('touchmove', handleTouchMove);
    document.body.removeEventListener('touchend', handleTouchEnd);
  });

  const handleMouseEnter = useEventCallback(event => {
    // If the slider was being interacted with but the mouse went off the window
    // and then re-entered while unclicked then end the interaction.
    if (event.buttons === 0 && event.relatedTarget !== null) {
      handleTouchEnd(event);
    }
  });

  const handleTouchStart = useEventCallback(event => {
    // Workaround as Safari has partial support for touchAction: 'none'.
    event.preventDefault();
    const touch = event.changedTouches[0];
    if (touch != null) touchId.current = touch.identifier;

    const pos = getPos(event, touchId);
    const newValue = getNewValue(pos);

    if (!isControlled) {
      setValueState(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }

    document.body.addEventListener('touchmove', handleTouchMove);
    document.body.addEventListener('touchend', handleTouchEnd);
  });

  useEffect(() => {
    const { current: slider } = sliderRef;
    slider.addEventListener('touchstart', handleTouchStart);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      document.body.removeEventListener('mousemove', handleTouchMove);
      document.body.removeEventListener('mouseup', handleTouchEnd);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('touchmove', handleTouchMove);
      document.body.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseEnter, handleTouchEnd, handleTouchMove, handleTouchStart]);

  const handleMouseDown = useEventCallback(event => {
    event.preventDefault();
    const pos = getPos(event, touchId);
    const newValue = getNewValue(pos);

    if (!isControlled) {
      setValueState(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }

    document.body.addEventListener('mousemove', handleTouchMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseup', handleTouchEnd);
  });

  const left = valueToPos(range ? values[0] : min, min, max, dimension.width);
  const width =
    valueToPos(values[values.length - 1], min, max, dimension.width) - left;

  const trackStyle = { left, width };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={sliderRef} className="slider" onMouseDown={handleMouseDown}>
      <span className="slider-rail" />
      <span className="slider-track" style={trackStyle} />
      {values.map((v, i) => {
        const style = { left: valueToPos(v, min, max, dimension.width) };
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="slider-thumb"
            style={style}
            role="slider"
            tabIndex="0"
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={v}
          >
            {v}
          </div>
        );
      })}
    </div>
  );
}

Slider.defaultProps = defaultProps;

export default React.memo(Slider);
