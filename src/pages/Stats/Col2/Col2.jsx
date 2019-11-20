import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { getImage } from 'utils';
import { ITEM_KEYS } from 'data';
import { Image } from 'components';

function Col2({ items }) {
  return (
    <div id="stats-col2">
      <div className="item-container">
        {ITEM_KEYS.map(key => {
          const className = clsx(key === 'adventurer' ? 'lg' : 'md', key);
          const image = getImage(items[key], key);
          return <Image key={key} name={key} size={className} image={image} />;
        })}
      </div>
    </div>
  );
}

const mapStateToProps = ({ items }) => {
  return { items };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Col2);
