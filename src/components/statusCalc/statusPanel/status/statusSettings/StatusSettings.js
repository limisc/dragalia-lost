import React, { Fragment } from 'react';
import LevelInput from './levelInput/LevelInput';
import UnbindItem from './UnbindItem';
import SelectItem from './SelectItem';

const StatusSettings = (props) => {
  const { section } = props;
  return (
    <div className="ui form">
      <Fragment>
        <LevelInput
          section={section}
        />
        {section === "adventurer" ?
          <SelectItem
            section={section}
          />
          :
          <UnbindItem
            section={section}
          />
        }
      </Fragment >
    </div>
  );
}

export default StatusSettings;