import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { getItemList, getPaperBGC } from 'utils';
import Item from './Item';

function ItemList({ options, focused, list, theme }) {
  const listRef = useRef();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(0);
    }
  }, [focused, options]);

  return (
    <div className="list" style={getPaperBGC(theme)}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            ref={listRef}
            height={height}
            width={width}
            itemSize={68}
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
  const { focused, options, theme } = state;
  return {
    focused,
    options,
    theme,
    list: getItemList(state, props),
  };
};

export default connect(mapStateToProps)(ItemList);
