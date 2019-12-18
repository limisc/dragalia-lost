import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { getPaperBGC } from 'utils';

function SliderBtn({ name, theme, onClick = () => {} }) {
  const cn = clsx('slider-btn', name);

  const timeRef = useRef();
  const intervalRef = useRef();
  const [press, setPress] = useState(false);

  const start = useCallback(() => {
    setPress(true);
  }, []);

  const stop = useCallback(() => {
    setPress(false);
  }, []);

  useEffect(() => {
    if (press) {
      timeRef.current = setTimeout(() => {
        intervalRef.current = setInterval(onClick, 50);
      }, 300);
    } else {
      clearTimeout(timeRef.current);
      clearInterval(intervalRef.current);
    }

    return () => {
      clearTimeout(timeRef.current);
      clearInterval(intervalRef.current);
    };
  }, [press, onClick]);

  return (
    <button
      type="button"
      style={getPaperBGC(theme)}
      aria-label={name}
      className={cn}
      name={name}
      onClick={onClick}
      onMouseDown={start}
      onMouseUp={stop}
      onMouseLeave={stop}
      onTouchStart={start}
      onTouchEnd={stop}
    />
  );
}

const mapStateToProps = ({ theme }) => {
  return { theme };
};

export default connect(mapStateToProps)(SliderBtn);
