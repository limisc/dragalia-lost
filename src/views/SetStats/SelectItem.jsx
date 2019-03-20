// @flow
import React from 'react';
import { Select } from "components";

class SelectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mana: {
        "5": ["50", "45", "40", "30", "20", "10", "0"],
        "4": ["40", "30", "20", "10", "0"],
        "3": ["30", "20", "10", "0"],
      },
      curRarity: {
        "5": ["5"],
        "4": ["5", "4"],
        "3": ["5", "4", "3"],
      },
      unbind: ["4", "3", "2", "1", "0"],
    };
  }

  render() {
    const {
      disabled,
      label,
      lang,
      value,
      rarity,
      onChange,
    } = this.props;

    const options = this.getOptions(label, rarity);

    return (
      <Select
        disabled={disabled}
        label={label}
        lang={lang}
        options={options}
        value={value}
        onChange={onChange}
      />
    );
  }

  getOptions = (label, rarity) => {
    switch (label) {
      case "ex":
      case "unbind":
        return this.state.unbind;
      case "curRarity":
      case "mana":
        return this.state[label][rarity];
      default:
        return [];
    }
  }
}

export default SelectItem;