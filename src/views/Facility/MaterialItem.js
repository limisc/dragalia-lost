/* eslint-disable no-unused-vars */
import React, { memo, Fragment } from 'react';
import { Image } from 'components';

const MaterialItem = memo(({ columnIndex, data, rowIndex, style }) => {
  const { material, materialArray } = data;
  const key = materialArray[2 * rowIndex + columnIndex];
  const quantity = material[key];
  return (
    <Fragment>
      {quantity && (
        <div style={{ ...style, display: 'flex' }}>
          <Image field="material" image={key} />
          <div className="center fill-remains">{quantity}</div>
        </div>
      )}
    </Fragment>
  );
});

export default MaterialItem;
