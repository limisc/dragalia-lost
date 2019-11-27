import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { getItemList } from 'utils';
import Item from './Item';

function ItemList({ options, focused, list }) {
  const listRef = useRef();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(0);
    }
  }, [focused, options]);

  return (
    <div className="list">
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            ref={listRef}
            height={height}
            width={width}
            itemSize={65}
            itemCount={list.length}
            itemData={list}
          >
            {Item}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const { focused, options } = state;
  return {
    focused,
    options,
    list: getItemList(state, props),
  };
};

export default connect(mapStateToProps)(ItemList);
