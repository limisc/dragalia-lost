//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import SetLang from './SetLang';
import Reset from './Reset';

const Settings = () => {
  return (
    <div className="flex">
      <SetLang />
      <Reset />
    </div>
  );
};

export default Settings;
