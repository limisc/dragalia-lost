/* eslint-disable no-unused-vars */
import React from 'react';
import { Select } from 'components';
import { selectOptions } from 'store';

const getOptions = (label, rarity) => {
  let options = [];
  if (label === 'ex' || label === 'unbind') {
    options = selectOptions.unbind;
  } else if (label === 'curRarity' || label === 'mana') {
    options = selectOptions[label][rarity];
  }
  return options;
};

class SelectItem extends React.PureComponent {
  constructor(props) {
    super(props);
    const { label, rarity } = props;
    this.state = {
      rarity,
      options: getOptions(label, rarity),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { label, rarity } = props;
    if (rarity !== state.rarity) {
      const options = getOptions(label, rarity);
      return {
        rarity,
        options,
      };
    }

    return null;
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
