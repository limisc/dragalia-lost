/* eslint-disable no-unused-vars */
import React, { memo, useMemo, useCallback } from 'react';
import { getLimit } from 'utils';
import locales from 'locales';
import { Image, Slider } from 'components';

const FacilityItem = memo(function FacilityItem(props) {
  const { index, item, lang, setFacility } = props;
  const { image: id, type, value } = item;
  const title = locales(id, lang, 'halidom');
  const image = `facility/${id}`;
  const max = useMemo(() => (type === 'event' ? 35 : getLimit(type)), [type]);

  const onChange = useCallback(
    ({ value }) => {
      setFacility(prevFacility => {
        return prevFacility.map((f, i) => (i === index ? { ...f, value } : f));
      });
    },
    [index, setFacility]
  );

  const removeItem = () => {
    setFacility(prevFacility => prevFacility.filter((_, i) => i !== index));
  };

  return (
    <div className="facility-item">
      <Image image={image} size="md" title={title} onClick={removeItem} />
      <Slider max={max} value={value} onChange={onChange} />
    </div>
  );
});

export default FacilityItem;
