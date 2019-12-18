import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { getInputBGC } from 'utils';

function Select(props) {
  const {
    disabled,
    name,
    options,
    label,
    theme,
    value,
    onChange = () => {},
  } = props;

  const ref = useRef();
  const [expand, setExpand] = useState(false);
  const [cursor, setCursor] = useState(undefined);

  const arrow = clsx('arrow', expand ? 'up' : 'down');

  const toggleSelect = () => {
    if (disabled) return;
    setExpand(prevExpand => !prevExpand);
  };

  const handleChange = e => {
    const val = e.target.getAttribute('value');
    onChange({ name, value: val });
    setCursor(undefined);
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleKeyDown = e => {
    const len = options.length;
    switch (e.key) {
      case 'Escape':
      case 'Tab':
        setCursor(undefined);
        setExpand(false);
        break;
      case 'Enter':
        if (expand && cursor !== undefined && value !== options[cursor].value) {
          onChange({ name, value: options[cursor].value });
        }
        setCursor(undefined);
        toggleSelect();
        break;
      case 'ArrowUp':
        if (expand) {
          setCursor(prevCursor => {
            return !prevCursor ? len - 1 : prevCursor - 1;
          });
        }
        break;
      case 'ArrowDown':
        if (expand) {
          setCursor(prevCursor => {
            if (prevCursor === undefined) return 0;

            return (prevCursor + 1) % len;
          });
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const closeOptions = () => {
      setExpand(false);
    };

    setTimeout(() => {
      if (expand) {
        window.addEventListener('click', closeOptions);
      } else {
        window.removeEventListener('click', closeOptions);
      }
    }, 0);

    return () => {
      window.removeEventListener('click', closeOptions);
    };
  }, [expand]);

  return (
    <div className="select">
      <div
        ref={ref}
        className={clsx('select-control', { disabled })}
        style={getInputBGC(theme)}
        role="button"
        tabIndex={disabled ? '-1' : '0'}
        onClick={toggleSelect}
        onKeyDown={handleKeyDown}
      >
        <div>{label || value}</div>
        <span className={arrow} />
        <input type="hidden" name={name} value={value} />
      </div>

      {expand && (
        <ul className="select-list">
          {options.map((opt, i) => {
            const optClass = clsx(
              'select-option',
              { hover: cursor === i },
              { focus: opt.value === value }
            );
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                className={optClass}
                value={opt.value}
                onClick={handleChange}
                onKeyDown={null}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = ({ theme }) => {
  return { theme };
};

export default connect(mapStateToProps)(Select);
