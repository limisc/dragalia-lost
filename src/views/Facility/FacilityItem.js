/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { Image, Slider } from 'components';

const FacilityItem = memo(({ index, image, max, value, onClick, onChange }) => {
  return (
    <div
      key={index}
      className="gutter-bottom"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Image field="facility" image={image} onClick={onClick(index)} />
      <Slider index={index} max={max} value={value} onChange={onChange} />
    </div>
  );
});

export default FacilityItem;
