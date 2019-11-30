import React, { memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ENEMY_INFO } from 'data';
import { Image } from 'components';

const enemyOptions = Object.keys(ENEMY_INFO);

const SelectEnemy = memo(function SelectEnemy(props) {
  const { name, value, onChange = () => {} } = props;
  const ref = useRef();
  const [expand, setExpand] = useState(false);

  const arrow = clsx('animated-arrow', expand ? 'up' : 'down');
  const imageURL = `${process.env.PUBLIC_URL}/images/dungeon/${value}.png`;

  const toggleSelect = () => {
    setExpand(prevExpand => !prevExpand);
  };

  const handleChange = e => {
    const val = e.currentTarget.getAttribute('value');
    onChange({ name, value: val });

    if (ref.current) {
      ref.current.focus();
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
    <div className="select select-enemy">
      <div
        ref={ref}
        className="select-control white"
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
        role="button"
        tabIndex="0"
        onClick={toggleSelect}
        onKeyDown={null}
      >
        <span className={arrow} />
      </div>

      {expand && (
        <ul className="select-list">
          {enemyOptions.map(opt => {
            const optClass = clsx('select-option', {
              focus: opt === value,
            });
            return (
              <li
                key={opt}
                role="option"
                aria-selected={opt === value}
                className={optClass}
                value={opt}
                onClick={handleChange}
                onKeyDown={null}
              >
                <Image name={opt} image={`dungeon/${opt}`} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default SelectEnemy;
