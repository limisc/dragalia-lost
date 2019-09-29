import React from 'react';
import { Select } from 'components';

const SELECT_OPTIONS = {
  mana_3: ['30', '20', '10', '0'],
  mana_4: ['40', '30', '20', '10', '0'],
  mana_5: ['50', '45', '40', '30', '20', '10', '0'],
  curRarity_3: ['5', '4', '3'],
  curRarity_4: ['5', '4'],
  curRarity_5: ['5'],
  rest: ['4', '3', '2', '1', '0'],
};

function SelectItem({ label, value, rarity, disabled, onChange }) {
  const options = React.useMemo(() => {
    if (label === 'curRarity' || label === 'mana') {
      return SELECT_OPTIONS[`${label}_${rarity}`];
    }

    if (label === 'ex' || label === 'unbind') {
      return SELECT_OPTIONS.rest;
    }

    return [];
  }, [label, rarity]);

  return (
    <Select
      label={label}
      value={value}
      options={options}
      disabled={disabled}
      onChange={onChange}
    />
  );
}

export default React.memo(SelectItem);
