import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import locales from 'locales';
import { maxItem, selectFocus, setPanel } from 'actions';
import { getImage, useEvent } from 'utils';
import { ITEM_KEYS } from 'data';
import { Image } from 'components';
import Item from './Item';

function Col2({ focused, items, lang, maxItem, selectFocus, setPanel }) {
  const onClick = useEvent(e => {
    setPanel(false);
    selectFocus(e.target.name);
  });

  const setMax = e => {
    maxItem(e.target.name);
  };

  return (
    <div id="stats-col2">
      <div className="avatar-list">
        {ITEM_KEYS.map(key => {
          const className = clsx({ scale: key === focused }, key);

          const { [key]: item } = items;
          const title =
            item === null
              ? locales(key, lang)
              : item.name[lang] || item.name.en;
          const image = getImage(item, key);

          return (
            <div key={key}>
              <Image
                name={key}
                size={className}
                image={image}
                title={title}
                onClick={onClick}
              />

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
  setPanel,
};

export default connect(mapStateToProps, actionCreators)(Col2);
