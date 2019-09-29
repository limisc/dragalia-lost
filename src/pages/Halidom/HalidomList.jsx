import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import { Context, HalidomItem } from 'components';
import { HALIDOM_LIST } from 'data';

function itemKey({ columnIndex, rowIndex, data: { cols, keyArray } }) {
  return (
    keyArray[cols * rowIndex + columnIndex] || `${rowIndex}_${columnIndex}`
  );
}

const defaultProps = {
  weapons: [],
  elements: [],
};

function HalidomList({ elements, weapons }) {
  const { width: windowWidth } = React.useContext(Context);

  const filters = [...elements, ...weapons];
  const keyArray = HALIDOM_LIST.filter(item => {
    return filters.some(f => item.includes(f));
  });

  const cols = windowWidth > 700 ? 2 : 1;

  const data = { cols, keyArray };
  const rows = Math.ceil(keyArray.length / cols);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeGrid
          width={width}
          height={height}
          itemData={data}
          itemKey={itemKey}
          columnCount={cols}
          rowCount={rows}
          columnWidth={width / cols - 8}
          rowHeight={100}
        >
          {HalidomItem}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
}

HalidomList.defaultProps = defaultProps;

export default React.memo(HalidomList);
