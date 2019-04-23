//@flow
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
    // TODO hide dungeon info in calc mode, show it in simc
    // const info = dungeonInfo[dungeon];
    // <div className="flex gutter-top">
    //   <InputNumber
    //     label="STR"
    //     value={info.STR}
    //     disabled={true}
    //     onChange={onChange}
    //   />

    //   <InputNumber
    //     label="multi"
    //     value={info.multi}
    //     disabled={true}
    //     onChange={onChange}
    //   />
    // </div>;

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
