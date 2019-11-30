import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import locales from 'locales';
import { maxItem, resetItems, saveBuild, selectFocus } from 'actions';
import { getImage, refs } from 'utils';
import { ITEM_KEYS } from 'data';
import { Image } from 'components';
import SplitBtn from './SplitBtn';
import Item from './Item';

function Col2({ focused, items, lang, maxItem, resetItems, selectFocus }) {
  const handleFocus = useCallback(
    e => {
      selectFocus(e.target.name);
    },
    [selectFocus]
  );

  const handleReset = () => {
    resetItems();
    window.scroll(refs.col2.current.offsetTop - 48, 0);
  };

  const setMax = e => {
    maxItem(e.target.name);
  };

  return (
    <div id="stats-col2" ref={refs.col2}>
      <div className="grid-2">
        <SplitBtn />
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </div>
      <div className="avatar-list">
        {ITEM_KEYS.map(key => {
          const className = clsx('avatar', { scale: key === focused });

          const { [key]: item } = items;
          const title =
            item === null
              ? locales(key, lang)
              : item.name[lang] || item.name.en;
          const image = getImage(item, key);
          const { augHp = '', augStr = '' } = item || {};
          const augments = Number(augHp) + Number(augStr);

          return (
            <div key={key} className="avatar-item">
              <div className={className}>
                <Image
                  name={key}
                  image={image}
                  title={title}
                  onClick={handleFocus}
                />
                {augments !== 0 && <span>{`+${augments}`}</span>}
              </div>

              {item !== null && (
                <button type="button" name={key} onClick={setMax}>
                  MAX
                </button>
              )}
            </div>
          );
        })}
      </div>

      <Item lang={lang} />
    </div>
  );
}

const mapStateToProps = ({ focused, items }) => {
  return { focused, items };
};

const mapDispatchToProps = {
  maxItem,
  resetItems,
  saveBuild,
  selectFocus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Col2);
