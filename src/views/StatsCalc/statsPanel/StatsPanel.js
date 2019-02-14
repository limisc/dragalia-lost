import React from 'react';
import StatsAvatar from './stats/StatsAvatar';
import StatsName from './stats/StatsName';
import StatsField from './stats/StatsField';
import HalidomStats from './stats/HalidomStats';

const sections = ["adventurer", "weapon", "wyrmprint", "dragon"];

const SettingPanel = () => {
  return (
    <div className="six wide column">
      {sections.map(section =>
        <div className="row" key={section}>
          <div className="ui two column grid">
            <div className="five wide column">
              <StatsAvatar
                section={section}
              />
              <StatsName
                section={section}
              />
            </div>
            <StatsField
              section={section}
            />
          </div>
        </div>
      )}
      <HalidomStats />
    </div>
  );
};

export default SettingPanel;