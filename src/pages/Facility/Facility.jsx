import React, { useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { IconBtns, Dialog } from 'components';
import {
  refs,
  getLimit,
  loadState,
  removeState,
  saveState,
  useEventCallback,
} from 'utils';
import { material, keyDict } from 'data';
import FacilityItem from './FacilityItem';
import MaterialItem from './MaterialItem';

const btns = ['del', 'refresh', 'save', 'add'];

const getKey = (type, field) => {
  switch (type) {
    case 'rupies':
    case 'event':
    case 'item':
    case 'coin1':
    case 'coin2':
    case 'coin3':
    case 'talonstone':
      return keyDict[type];
    default:
      return keyDict[type][field];
  }
};

const sumArray = (arr, value) => {
  let sum = 0;
  const [start, end] = value;
  for (let i = start; i < end; i += 1) {
    sum += arr[i];
  }

  return sum;
};

function Facility() {
  const [open, setOpen] = useState(false);
  const [facility, setFacility] = useState(loadState('facility') || []);

  const onClick = useEventCallback(e => {
    switch (e.currentTarget.name) {
      case 'add':
        setOpen(true);
        break;
      case 'del': {
        setFacility([]);
        removeState('facility');
        break;
      }
      case 'refresh': {
        const backup = loadState('facility');
        if (backup) {
          setFacility(backup);
        }
        break;
      }
      case 'save':
        saveState('facility', facility);
        break;
      default:
        break;
    }
  });

  const onCreate = useEventCallback(({ type, field }) => {
    const id = type === 'event' ? 'event' : keyDict[type][field];
    const max = getLimit(type);
    setFacility(prev => [...prev, { id, type, field, value: [0, max] }]);
  });

  const needs = React.useMemo(() => {
    const dict = {};
    facility.forEach(f => {
      if (f.value[0] !== f.value[1]) {
        Object.entries(material[f.type]).forEach(([item, itemArr]) => {
          const qty = sumArray(itemArr, f.value);
          if (qty !== 0) {
            const key = getKey(item, f.field);
            dict[key] = (dict[key] || 0) + qty;
          }
        });
      }
    });
    return { dict, arr: Object.keys(dict) };
  }, [facility]);

  return (
    <main id="facility">
      <div>
        <IconBtns btns={btns} onClick={onClick} />
        <div>
          {facility.map((f, i) => {
            return (
              <FacilityItem
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                index={i}
                item={f}
                setFacility={setFacility}
              />
            );
          })}
        </div>
        <Dialog open={open} setOpen={setOpen} onCreate={onCreate} />
      </div>

      <div ref={refs.col3}>
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeGrid
              width={width}
              height={height}
              itemData={needs}
              columnCount={2}
              columnWidth={width / 2 - 8}
              rowCount={needs.arr.length}
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

export default React.memo(Facility);
