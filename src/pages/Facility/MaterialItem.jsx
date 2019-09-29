import React from 'react';
import { Image } from 'components';

function MaterialItem({ columnIndex, rowIndex, style, data: { dict, arr } }) {
  const key = arr[2 * rowIndex + columnIndex];
  const qty = dict[key];
  return (
    <>
      {qty && (
        <div style={style} className="material-item">
          <Image field="material" image={key} />
          <div>{qty}</div>
        </div>
      )}
    </>
  );
}

export default React.memo(MaterialItem);
