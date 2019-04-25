/* eslint-disable no-unused-vars */
import React from 'react';
import { Select } from 'components';
import { selectOptions } from 'store';

class SelectItem extends React.PureComponent {
  constructor(props) {
    super(props);
    const { label, rarity } = props;
    let options = [];
    if (label === 'ex' || label === 'unbind') {
      options = selectOptions.unbind;
    } else if (label === 'curRarity' || label === 'mana') {
      options = selectOptions[label][rarity];
    }

    this.state = { options };
  }

  render() {
    const { label, value, disabled, onChange } = this.props;

    return (
      <Select
        classes="col-2"
        label={label}
        value={value}
        options={this.state.options}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }
}

export default SelectItem;
