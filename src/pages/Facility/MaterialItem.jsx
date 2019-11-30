import React, { memo } from 'react';
import { Image } from 'components';

const MaterialItem = memo(function MaterialItem(props) {
  const { rowIndex, columnIndex, style, data } = props;
  const index = 2 * rowIndex + columnIndex;
  const item = data[index];

  if (item === undefined) return null;

  const [id, value] = item;
  const image = `material/${id}`;
  return (
    <div style={style} className="flex-v">
      <Image image={image} size="md" />
      <div style={{ flex: '1', textAlign: 'center' }}>{value}</div>
    </div>
  );
});

export default MaterialItem;
