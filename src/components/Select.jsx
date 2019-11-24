import React, { memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import locales from 'locales';

const Select = memo(function Select(props) {
  const { disabled, name, lang, options, value, onChange, setSelect } = props;
  const focusRef = useRef();
  const [expand, setExpand] = useState(false);
  const [cursor, setCursor] = useState();

  const arrowClassName = clsx('arrow', expand ? 'up' : 'down');

  const toggleSelect = () => {
    if (disabled) return;
    setExpand(prevExpand => !prevExpand);
  };

  const handleChange = e => {
    const val = e.target.getAttribute('value');
    if (onChange) {
      onChange({ name, value: val });
    } else if (setSelect) {
      setSelect(val);
    }

    if (focusRef.current) {
      focusRef.current.focus();
    }
  };

  const handleKeyDown = e => {
    const len = options.length;
    switch (e.key) {
      case 'Escape':
      case 'Tab':
        setExpand(false);
        break;
      case 'Enter':
        if (expand && value !== options[cursor]) {
          if (onChange) {
            onChange({ name, value: options[cursor] });
          } else if (setSelect) {
            setSelect(options[cursor]);
          }
        }
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
    if (Array.isArray(options)) {
      const newCursor = options.findIndex(v => v === value);
      setCursor(newCursor);
    }
  }, [options, value]);

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
        className="select-header"
        ref={focusRef}
        role="button"
        tabIndex="0"
        onClick={toggleSelect}
        onKeyDown={handleKeyDown}
      >
        {locales(value, lang)}
        {!disabled && <span className={arrowClassName} />}
      </div>
      <input type="hidden" name={name} value={value} />

      {expand && (
        <ul className="select-list">
          {options.map((opt, i) => {
            const optClassName = clsx('select-option', { focus: cursor === i });
            const text = locales(opt, lang);
            return (
              <li
                key={opt}
                role="option"
                aria-selected={opt === value}
                className={optClassName}
                value={opt}
                onKeyDown={null}
                onClick={handleChange}
              >
                {text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default Select;
