/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import createCachedSelector from 're-reselect';
import uuid from 'uuid/v1';
import {
  getMaterialKey,
  ELEMENT_TYPES,
  HALIDOM_LIST,
  HALIDOM_TYPES,
  MATERIAL,
  WEAPON_TYPES,
} from 'data';
import { getLimit, loadState, removeState, saveState, useEvent } from 'utils';
import { BtnPanel, Select } from 'components';
import locales from 'locales';
import FacilityItem from './FacilityItem';
import MaterialItem from './MaterialItem';

const btns = ['del', 'refresh', 'save', 'add'];

const calcItem = createCachedSelector(
  item => item,
  item => {
    const {
      type,
      field,
      value: [start, end],
    } = item;
    if (start === end) return {};
    const ret = {};
    for (let i = start; i < end; i += 1) {
      Object.entries(MATERIAL[type][i]).forEach(([key, value]) => {
        const materialKey = getMaterialKey(key, field);
        ret[materialKey] = (ret[materialKey] || 0) + value;
      });
    }

    return ret;
  }
)(item => {
  const {
    type,
    field,
    value: [start, end],
  } = item;

  if (start === end) return 'NONE';

  return `${type}_${field}_${start}_${end}`;
});

function Facility() {
  const { lang = 'en' } = useParams();
  const [facility, setFacility] = useState([]);
  const [state, setState] = useState({ type: 'dojo', field: '' });

  const typeOptions = useMemo(() => {
    return [...HALIDOM_TYPES, 'dracolith'].map(value => ({
      value,
      label: locales(value, lang),
    }));
  }, [lang]);

  const fieldOptions = useMemo(() => {
    const array = state.type === 'dojo' ? WEAPON_TYPES : ELEMENT_TYPES;
    return array.map(value => ({ value, label: locales(value, lang) }));
  }, [state.type, lang]);

  const onClick = useEvent(e => {
    switch (e.currentTarget.name) {
      case 'add': {
        const { type, field } = state;
        let key;
        let max;
        if (type !== 'event') {
          if (field === '') return;
          key = getMaterialKey(type, field);
          max = getLimit(type);
        } else {
          key = 'event';
          max = 35;
        }

        setFacility(prevFacility => [
          ...prevFacility,
          { id: uuid(), image: key, type, field, value: [0, max] },
        ]);
        break;
      }
      case 'del':
        removeState('dragalialost-facility');
        setFacility([]);
        break;
      case 'save':
        saveState('dragalialost-facility', facility);
        break;
      case 'refresh': {
        const backup = loadState('dragalialost-facility');
        if (backup === null) return;
        setFacility(backup);
        break;
      }
      default:
        break;
    }
  });

  const onChange = useCallback(({ name, value }) => {
    setState(prevState => ({ ...prevState, [name]: value }));
  }, []);

  useEffect(() => {
    // auto detect local facility or halidom records
    const localFacility = loadState('dragalialost-facility');

    if (localFacility !== null) {
      setFacility(localFacility);
      return;
    }

    const localHalidom = loadState('dragalialost-halidom');
    if (localHalidom === null) return;

    const tempArray = [];
    HALIDOM_LIST.forEach(key => {
      const item = localHalidom[key];
      const { id, type, level } = item;
      const max = id === '101501' ? 35 : getLimit(type);
      if (level !== max) {
        const keySet = key.split('_');
        let keyType = keySet[keySet.length - 2];
        let field = keySet[keySet.length - 3];
        if (keyType === 'eventE' || keyType === 'eventW') {
          keyType = 'event';
          field = 'event';
        }

        tempArray.push({
          id: uuid(),
          image: id,
          type,
          field,
          value: [level, max],
        });
      }
    });

    if (tempArray.length !== 0) {
      setFacility(tempArray);
      saveState('dragalialost-facility', tempArray);
    }
  }, []);

  useEffect(() => {
    const { type, field } = state;
    if (field === '') return;

    if (type === 'dojo') {
      if (WEAPON_TYPES.includes(field)) return;
    } else if (type !== 'event' && ELEMENT_TYPES.includes(field)) {
      return;
    }

    setState(prevState => ({ ...prevState, field: '' }));
  }, [state]);

  const material = useMemo(() => {
    const ret = {};
    facility.forEach(item => {
      const subRet = calcItem(item);
      Object.entries(subRet).forEach(([key, value]) => {
        ret[key] = (ret[key] || 0) + value;
      });
    });

    return Object.entries(ret).filter(([_, value]) => value !== 0);
  }, [facility]);

  return (
    <main id="facility">
      <div id="facility-col1">
        <BtnPanel btns={btns} onClick={onClick} />
        <div className="grid-2">
          <Select
            name="type"
            label={locales(state.type, lang)}
            value={state.type}
            options={typeOptions}
            onChange={onChange}
          />

          <Select
            disabled={state.type === 'event'}
            name="field"
            label={locales(state.field, lang)}
            value={state.field}
            options={fieldOptions}
            onChange={onChange}
          />
        </div>
        <div className="list">
          {facility.map((f, i) => {
            return (
              <FacilityItem
                key={f.id}
                index={i}
                item={f}
                lang={lang}
                setFacility={setFacility}
              />
            );
          })}
        </div>
      </div>

      <div id="facility-col2" className="list">
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeGrid
              width={width}
              height={height}
              itemData={material}
              columnCount={2}
              columnWidth={width / 2 - 8}
              rowCount={material.length}
              rowHeight={64}
            >
              {MaterialItem}
            </FixedSizeGrid>
          )}
        </AutoSizer>
      </div>
    </main>
  );
}

export default Facility;
