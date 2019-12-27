import React, { memo, useMemo } from 'react';
import { Select } from 'components';

const SELECT_OPTIONS = {
  mana: {
    '3': ['30', '20', '10', '0'],
    '4': ['40', '30', '20', '10', '0'],
    '5': ['50', '45', '40', '30', '20', '10', '0'],
  },
  curRarity: {
    '3': ['5', '4', '3'],
    '4': ['5', '4'],
    '5': ['5'],
  },
  default: ['4', '3', '2', '1', '0'],
};

const SelectItem = memo(function SelectItem(props) {
  const { name, value, rarity, spiral, onChange } = props;

  const options = useMemo(() => {
    let options = [];
    switch (name) {
      case 'mana': {
        if (spiral && rarity === '5') {
          options = ['70', ...SELECT_OPTIONS.mana['5']];
        } else {
          options = SELECT_OPTIONS[name][rarity];
        }
        break;
      }
      case 'curRarity':
        options = SELECT_OPTIONS[name][rarity];
        break;
      case 'ex':
      case 'unbind':
        options = SELECT_OPTIONS.default;
        break;
      default:
        break;
    }

    return options.map(val => ({ value: val, label: val }));
  }, [name, rarity, spiral]);

  const disabled = options.length < 2;

  return (
    <Select
      disabled={disabled}
      name={name}
      value={value}
      options={options}
      onChange={onChange}
    />
  );
});

export default SelectItem;
