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
  const { name, value, rarity, onChange } = props;

  const options = useMemo(() => {
    let options = [];
    switch (name) {
      case 'curRarity':
      case 'mana':
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
  }, [name, rarity]);

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
