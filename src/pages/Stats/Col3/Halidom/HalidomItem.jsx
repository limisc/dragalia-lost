import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import locales from 'locales';
import { updateHalidom } from 'actions';
import { getFacilityMaxLevel } from 'utils';
import { Image, Slider } from 'components';

function HalidomItem({ halidomKey, item, style, updateHalidom }) {
  const { lang } = useParams();
  const { id, level } = item;
  const image = `facility/${id}`;
  const title = locales(id, lang, 'halidom');

  const max = getFacilityMaxLevel(item);

  const handleChange = useCallback(
    ({ name, value }) => {
      updateHalidom({ halidomKey: name, level: value });
    },
    [updateHalidom]
  );

  return (
    <div style={style} className="halidom-item">
      <Image image={image} size="lg" title={title} />
      <Slider
        name={halidomKey}
        value={level}
        max={max}
        onChange={handleChange}
      />
    </div>
  );
}

const getHalidomKey = props => {
  const { halidomKey, data, columnIndex, rowIndex } = props;
  if (halidomKey) {
    return halidomKey;
  }

  const { cols, keyArr } = data;
  return keyArr[cols * rowIndex + columnIndex];
};

const mapStateToProps = (state, props) => {
  const halidomKey = getHalidomKey(props);
  return {
    halidomKey,
    item: state.halidom[halidomKey],
  };
};

const mapDispatchToProps = { updateHalidom };

export default connect(mapStateToProps, mapDispatchToProps)(HalidomItem);
