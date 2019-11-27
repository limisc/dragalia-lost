/* eslint-disable react/no-array-index-key */
import React, { memo, useRef, useState, useEffect, useCallback } from 'react';
import { useEvent } from 'utils';
import SliderBtn from './SliderBtn';

const asc = (a, b) => a - b;

const getPos = (e, touchRef) => {
  if (touchRef.current !== undefined && e.changedTouches) {
    for (let i = 0; i < e.changedTouches.length; i += 1) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchRef.current) {
        return touch.clientX;
      }
    }

    return false;
  }

  return e.clientX;
};

const Slider = memo(function Slider(props) {
  const { min = 0, max = 30, name, value, onChange = () => {} } = props;
  const ref = useRef();
  const activeRef = useRef(0);
  const touchRef = useRef();

  const [dimension, setDimension] = useState({ left: 0, width: 0 });

  const handleWidth = useCallback(() => {
    if (ref.current) {
      const { left, width } = ref.current.getBoundingClientRect();
      setDimension({ left, width });
    }
  }, []);

  useEffect(() => {
    handleWidth();
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, [handleWidth]);

  const range = Array.isArray(value);
  const values = range ? [...value].sort(asc) : [value];

  const setRangeValues = val => {
    if (range) {
      const index = activeRef.current;
      const newValues = values.map((v, i) => (i === index ? val : v));
      activeRef.current = newValues.indexOf(val);
      return newValues;
    }

    return val;
  };

  const getValue = pos => {
    const { left, width } = dimension;
    let offset = pos - left;
    if (offset < 0) {
      offset = 0;
    } else if (offset > width) {
      offset = width;
    }
    const val = Math.round((max - min) * (offset / width) + min);
    return setRangeValues(val);
  };

  const valToPos = v => {
    const { width } = dimension;
    const pct = (((v - min) / (max - min)) * (width - 30) * 100) / width;
    return `${pct}%`;
  };

  const handleChange = val => {
    onChange({ name, value: val });
  };

  const handleMove = useEvent(e => {
    const pos = getPos(e, touchRef);
    const val = getValue(pos);
    handleChange(val);
  });

  const handleEnd = useEvent(() => {
    touchRef.current = undefined;
    document.body.removeEventListener('mousemove', handleMove);
    document.body.removeEventListener('mouseup', handleEnd);
    document.body.removeEventListener('touchmove', handleMove);
    document.body.removeEventListener('touchend', handleEnd);
  });

  const handleThumb = useEvent(e => {
    e.preventDefault();
    if (e.button !== 0) return;
    const { index } = e.target.dataset;
    activeRef.current = Number(index);
    document.body.addEventListener('mousemove', handleMove);
    document.body.addEventListener('mouseup', handleEnd);
  });

  const handleMouseDown = useEvent(e => {
    e.preventDefault();
    if (e.button !== 0) return;

    const { index } = e.target.dataset;

    let active = 0;
    if (index) {
      active = Number(index);
    }

    activeRef.current = active;
    const pos = getPos(e, touchRef);
    const val = getValue(pos);
    handleChange(val);
    document.body.addEventListener('mousemove', handleMove);
    document.body.addEventListener('mouseup', handleEnd);
  });

  const handleTouchStart = useEvent(e => {
    e.preventDefault();
    e.stopPropagation();

    const touch = e.changedTouches[0];
    if (touch != null) {
      touchRef.current = touch.identifier;
    }

    const { index } = e.target.dataset;
    activeRef.current = Number(index);
    document.body.addEventListener('touchmove', handleMove);
    document.body.addEventListener('touchend', handleEnd);
  });

  const handleDecrement = useEvent(() => {
    activeRef.current = 0;
    const val = values[0] - 1;
    if (val >= min) {
      handleChange(setRangeValues(val));
    }
  });

  const handleIncrement = useEvent(() => {
    activeRef.current = 0;
    const upperBound = range ? values[values.length - 1] : max;
    const val = values[0] + 1;

    if (val <= upperBound) {
      handleChange(setRangeValues(val));
    }
  });

  return (
    <div
      className="slider"
      onContextMenu={e => {
        e.preventDefault();
      }}
    >
      <SliderBtn name="minus" onClick={handleDecrement} />
      <div
        ref={ref}
        role="presentation"
        className="slider-main"
        onMouseDown={handleMouseDown}
      >
        <span className="slider-rail" />
        <span
          className="slider-track"
          style={{
            left: range ? valToPos(values[0]) : '0',
            right: `calc(100% - ${valToPos(range ? values[1] : values[0])})`,
          }}
        />
        {values.map((v, i) => {
          const style = {
            left: valToPos(v),
            zIndex: i === activeRef.current ? 1 : 'auto',
          };

          return (
            <div
              key={i}
              style={style}
              className="slider-thumb"
              data-index={i}
              role="slider"
              aria-valuemax={max}
              aria-valuemin={min}
              aria-valuenow={v}
              tabIndex="0"
              onMouseDown={handleThumb}
              onTouchStart={handleTouchStart}
            >
              {v}
            </div>
          );
        })}
      </div>
      <SliderBtn name="plus" onClick={handleIncrement} />
    </div>
  );
});

export default Slider;
