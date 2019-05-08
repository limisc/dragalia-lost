/* eslint-disable no-unused-vars */
import React, { memo, useMemo } from 'react';
import { Select } from 'components';

const selectOptions = {
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
  unbind: ['4', '3', '2', '1', '0'],
};

const SelectItem = memo(({ label, value, rarity, disabled, onChange }) => {
  const options = useMemo(() => {
    if (label === 'ex' || label === 'unbind') {
      return selectOptions.unbind;
    } else if (label === 'curRarity' || label === 'mana') {
      return selectOptions[label][rarity];
    }
    return [];
  }, [label, rarity]);

  return (
    <Select
      classes="col-2"
      label={label}
      value={value}
      options={options}
      disabled={disabled}
      onChange={onChange}
    />
  );
});

export default SelectItem;
