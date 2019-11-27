import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import locales from 'locales';
import { maxItem, selectFocus } from 'actions';
import { getImage, useEvent } from 'utils';
import { ITEM_KEYS } from 'data';
import { Image } from 'components';
import Item from './Item';

function Col2({ focused, items, lang, maxItem, selectFocus }) {
  const onClick = useEvent(e => {
    selectFocus(e.target.name);
  });

  const setMax = e => {
    maxItem(e.target.name);
  };

  return (
    <div id="stats-col2">
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
            <div key={key}>
              <div className={className}>
                <Image
                  name={key}
                  image={image}
                  title={title}
                  onClick={onClick}
                />
                {augments !== 0 && <span>{augments}</span>}
              </div>

              <button type="button" name={key} onClick={setMax}>
                MAX
              </button>
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

const actionCreators = {
  maxItem,
  selectFocus,
};

export default connect(mapStateToProps, actionCreators)(Col2);
