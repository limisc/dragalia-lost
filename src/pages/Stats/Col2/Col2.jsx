/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { selectFocus } from 'actions';
import { getImage, useEvent } from 'utils';
import { ITEM_KEYS } from 'data';
import { Image } from 'components';
import Item from './Item';

function Col2({ focused, items, selectFocus }) {
  const onClick = useEvent(e => {
    selectFocus(e.target.name);
  });

  return (
    <div id="stats-col2">
      <div className="avatar-list">
        {ITEM_KEYS.map(key => {
          const className = clsx({ scale: key === focused }, key);
          const image = getImage(items[key], key);
          return (
            <div key={key}>
              <Image
                name={key}
                size={className}
                image={image}
                onClick={onClick}
              />

              <button type="button">MAX</button>
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

const actionCreators = { selectFocus };

export default connect(mapStateToProps, actionCreators)(Col2);
