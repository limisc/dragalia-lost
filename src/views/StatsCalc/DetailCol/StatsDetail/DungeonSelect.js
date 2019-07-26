/* eslint-disable no-unused-vars */
import React, { Fragment, memo, useContext } from 'react';
import { TextField } from '@material-ui/core';
import { dungeonInfo } from 'data';
import { Select, Input, Context } from 'components';
import { translate } from 'actions';
/* eslint-disable no-unused-vars */

const DungeonSelect = memo(({ dungeon, mult, onChange }) => {
  const dungeonOptions = Object.keys(dungeonInfo);
  const { lang } = useContext(Context);

  const handleKeyPress = e => {
    // prevent user enter + - e in number input field.
    if (['+', '-', 'e'].indexOf(e.key) !== -1) {
      e.preventDefault();
    }
  };

  return (
    <Fragment>
      <Select
        label="dungeon"
        classes="fluid"
        value={dungeon}
        options={dungeonOptions}
        onChange={onChange}
      />

      <TextField
        type="number"
        variant="filled"
        label={translate('mult', lang)}
        value={mult}
        className="fluid gutter-top"
        onChange={onChange}
        InputProps={{
          name: 'mult',
          onKeyPress: handleKeyPress,
        }}
      />
    </Fragment>
  );
});

export default DungeonSelect;
