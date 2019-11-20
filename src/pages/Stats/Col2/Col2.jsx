import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { selectFocus } from 'actions';
import { getImage, useEvent } from 'utils';
import { ITEM_KEYS } from 'data';
import { Image } from 'components';

function Col2({ items, selectFocus }) {
  const onClick = useEvent(e => {
    selectFocus(e.target.name);
  });

  return (
    <div id="stats-col2">
      <div className="item-container">
        {ITEM_KEYS.map(key => {
          const className = clsx(key === 'adventurer' ? 'lg' : 'md', key);
          const image = getImage(items[key], key);
          return (
            <Image
              key={key}
              name={key}
              size={className}
              image={image}
              onClick={onClick}
            />
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = ({ items }) => {
  return { items };
};

const actionCreators = { selectFocus };

export default connect(mapStateToProps, actionCreators)(Col2);
