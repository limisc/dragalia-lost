import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import locales from 'locales';
import { maxItem, selectFocus } from 'actions';
import { getImage, useEvent } from 'utils';
import { ITEM_KEYS } from 'data';
import { Image } from 'components';
import Item from './Item';

function Col2({ focused, items, maxItem, selectFocus }) {
  const { lang = 'en' } = useParams();

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
          const className = clsx({ scale: key === focused }, key);

          const { [key]: item } = items;
          const title = item === null ? locales(key, lang) : item.name[lang];
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

      <Item />
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
