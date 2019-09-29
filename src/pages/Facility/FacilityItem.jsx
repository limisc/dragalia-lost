import React from 'react';
import { Image } from 'components';
import { getLimit } from 'utils';
import Slider from './Slider';

function FacilityItem({ index, item, setFacility }) {
  const max = React.useMemo(() => getLimit(item.type), [item.type]);
  const removeItem = () => {
    setFacility(prev => prev.filter((_, i) => i !== index));
  };

  const onChange = value => {
    setFacility(prev =>
      prev.map((f, i) => {
        return i === index ? { ...f, value } : f;
      })
    );
  };

  return (
    <div className="facility-item">
      <Image field="facility" image={item.id} onClick={removeItem} />
      <Slider max={max} value={item.value} onChange={onChange} />
    </div>
  );
}

export default FacilityItem;
