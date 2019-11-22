/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import locales from 'locales';
import { updateHalidom } from 'actions';
import { getLimit, useEvent } from 'utils';
import { Image, Slider } from 'components';

function HalidomItem({ halidomKey, item, style, updateHalidom }) {
  const { lang } = useParams();
  const { id, type, level } = item;
  const image = `facility/${id}`;
  const name = locales(id, lang, 'halidom');

  const max = id === '100901' ? 35 : getLimit(type);
  const setLevel = useEvent(val => {
    updateHalidom({ halidomKey, level: val });
  });

  return (
    <div style={style} className="halidom-item">
      <Image image={image} size="lg" />
      <span className="name">{name}</span>
      <Slider value={level} max={max} setValue={setLevel} />
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

const actionCreators = { updateHalidom };

export default connect(mapStateToProps, actionCreators)(HalidomItem);
