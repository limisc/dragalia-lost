/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { delBuild, loadBuild, saveBuild } from 'actions';
import content from 'data';
import { Image } from 'components';
import { getImage } from 'utils';

function SplitBtn({ adventurer, builds, delBuild, loadBuild, saveBuild }) {
  const [expand, setExpand] = useState(false);
  const disabled = builds === null;
  const arrowClassName = clsx('arrow', expand ? 'up' : 'down', { disabled });

  const toggleExpand = () => {
    setExpand(prevState => !prevState);
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

  const onClick = e => {
    const { value } = e.currentTarget;
    if (e.target.name === 'del') {
      delBuild(value);
    } else {
      const build = builds[value];
      loadBuild(build);
    }
  };

  return (
    <div className="split-btn">
      <button type="button" disabled={adventurer === null} onClick={saveBuild}>
        SAVE
      </button>
      <button
        type="button"
        className={clsx('toggle-split', { disabled })}
        disabled={disabled}
        onClick={toggleExpand}
      >
        <span className={arrowClassName} />
      </button>

      {expand && builds && (
        <ul className="select-list">
          {Object.entries(builds).map(([key]) => {
            const item = content.adventurer[key];
            const image = getImage(item, 'adventurer');
            return (
              <li
                key={key}
                role="option"
                aria-selected={false}
                className="select-option"
                value={key}
                onClick={onClick}
                onKeyDown={null}
              >
                <Image image={image} size="md" />
                <button type="button" name="del">
                  <Image image="icon/cross" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = ({ builds, items: { adventurer } }) => {
  return { adventurer, builds };
};

const mapDispatchToProps = {
  delBuild,
  loadBuild,
  saveBuild,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplitBtn);
