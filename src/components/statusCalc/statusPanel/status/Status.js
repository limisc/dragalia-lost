import React from 'react';
import PropTypes from 'prop-types';
import StatusAvatar from './StatusAvatar';
import StatusSettings from './statusSettings/StatusSettings';

const Status = (props) => {
  const { section } = props;
  return (
    <div className="column">
      <div className="ui two column grid">
        <div className="six wide column">
          <StatusAvatar
            section={section}
          />
        </div>

        <div className="nine wide column">
          <StatusSettings
            section={section}
          />
        </div>
      </div>
    </div>
  );
};

Status.propTypes = {
  section: PropTypes.string.isRequired,
}
export default Status;