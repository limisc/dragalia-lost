import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { getFilters, getItemList } from 'utils';
import Item from './Item';

function ItemList({ filters, focused, list }) {
  const listRef = useRef();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(0);
    }
  }, [focused, filters]);

  return (
    <div className="list">
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            ref={listRef}
            height={height}
            width={width}
            itemSize={80}
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
  const { focused } = state;
  return {
    focused,
    filters: getFilters(state),
    list: getItemList(state, props),
  };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(ItemList);
