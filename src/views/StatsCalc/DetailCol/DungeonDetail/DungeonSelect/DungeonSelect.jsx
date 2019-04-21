//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { dungeonInfo } from 'data';
import { Select } from 'components';

class DungeonSelect extends React.PureComponent {
  render() {
    const { dungeon, onChange } = this.props;
    const dungeonOptions = Object.keys(dungeonInfo);
    // TODO hide dungeon info in calc mode, show it in simc
    // const info = dungeonInfo[dungeon];
    return (
      <>
        <Select
          label="dungeon"
          value={dungeon}
          options={dungeonOptions}
          onChange={onChange}
        />

        {/* <div className="flex gutter-top">
          <InputNumber label="STR" value={info.STR} disabled={true} onChange={onChange} />

          <InputNumber label="multi" value={info.multi} disabled={true} onChange={onChange} />
        </div> */}
      </>
    );
  }
}

export default DungeonSelect;
