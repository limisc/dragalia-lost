/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectFlag, updateHalidom } from 'actions';
import { getLimit, translate } from 'utils';
import { Context } from './ContextProvider';
import Image from './Image';

function HalidomItem({
  style,
  halidomFlag,
  halidomKey,
  id,
  level,
  type,
  selectFlag,
  updateHalidom,
}) {
  const { lang } = React.useContext(Context);
  const [lv, setLV] = useState(level);

  React.useEffect(() => {
    if (!halidomFlag) return;
    setLV(level);
    selectFlag(false);
  }, [halidomFlag, level, selectFlag]);

  const [timerId, setTimer] = useState(null);
  const { max, name } = React.useMemo(
    () => ({
      max: getLimit(type),
      name: translate(id, lang, 'halidom'),
    }),
    [id, lang, type]
  );

  if (!halidomKey) return null;

  const onChange = e => {
    clearTimeout(timerId);
    const { value } = e.target;
    const newLV = Number(value);

    const newId = setTimeout(() => {
      updateHalidom({ halidomKey, level: newLV });
    }, 500);

    setLV(newLV);
    setTimer(newId);
  };

  const decrement = () => {
    const newLV = lv - 1;
    if (newLV >= 0) {
      setLV(newLV);
      updateHalidom({ halidomKey, level: newLV });
    }
  };

  const increment = () => {
    const newLV = lv + 1;
    if (newLV <= max) {
      setLV(newLV);
      updateHalidom({ halidomKey, level: newLV });
    }
  };

  return (
    <div style={style} className="halidom-item">
      <Image size="lg" field="facility" image={id} />
      <span className="name">{name}</span>
      <span>{lv}</span>
      <Image size="sm" field="icon" image="minus" onClick={decrement} />
      <input type="range" min="0" max={max} value={lv} onChange={onChange} />
      <Image size="sm" field="icon" image="plus" onClick={increment} />
    </div>
  );
}

const mapStateToProps = (
  { halidom, halidomFlag },
  { itemKey, rowIndex, columnIndex, data }
) => {
  let halidomKey = itemKey;
  if (halidomKey == null) {
    const { cols, keyArray } = data;
    halidomKey = keyArray[cols * rowIndex + columnIndex];
  }
  const { id, level, type } = halidom[halidomKey] || {};
  return { halidomFlag, halidomKey, id, level, type };
};

const actionCreators = { selectFlag, updateHalidom };

export default connect(
  mapStateToProps,
  actionCreators
)(HalidomItem);
