import React, { memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const Select = memo(function Select(props) {
  const { disabled, name, options, label, value, onChange = () => {} } = props;
  const ref = useRef();
  const [expand, setExpand] = useState(false);
  const [cursor, setCursor] = useState(0);

  const arrow = clsx('animated-arrow', expand ? 'up' : 'down');

  const toggleSelect = () => {
    if (disabled) return;
    setExpand(prevExpand => !prevExpand);
  };

  const handleChange = e => {
    const val = e.target.getAttribute('value');
    onChange({ name, value: val });

    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleKeyDown = e => {
    const len = options.length;
    switch (e.key) {
      case 'Escape':
      case 'Tab':
        setCursor(0);
        setExpand(false);
        break;
      case 'Enter':
        if (expand && value !== options[cursor].value) {
          onChange({ name, value: options[cursor].value });
        }
        setCursor(0);
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
          setCursor(prevCursor => (prevCursor + 1) % len);
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
});

export default Select;
