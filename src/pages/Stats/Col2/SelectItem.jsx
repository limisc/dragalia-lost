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
  const { name, value, rarity, disabled: disabledProp, onChange } = props;

  const options = useMemo(() => {
    switch (name) {
      case 'curRarity':
      case 'mana':
        return SELECT_OPTIONS[name][rarity];
      case 'ex':
      case 'unbind':
        return SELECT_OPTIONS.default;
      default:
        return [];
    }
  }, [name, rarity]);

  const disabled = disabledProp || options.length < 2;

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
