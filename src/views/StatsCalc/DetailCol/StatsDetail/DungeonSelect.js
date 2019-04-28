/* eslint-disable no-unused-vars */
import React from 'react';
import { dungeonInfo } from 'data';
import { Select } from 'components';

class DungeonSelect extends React.PureComponent {
  state = {
    dungeonOptions: Object.keys(dungeonInfo),
  };

  render() {
    const { dungeon, onChange } = this.props;

    return (
      <Select
        label="dungeon"
        classes="fluid"
        value={dungeon}
        options={this.state.dungeonOptions}
        onChange={onChange}
      />
    );
  }
}

export default DungeonSelect;
