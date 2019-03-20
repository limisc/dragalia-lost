// @flow

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import HalidomItem from "./HalidomItem";

const propTypes = {
  facilities: PropTypes.object,
  field: PropTypes.string,
};

class HalidomField extends PureComponent {

  render() {
    const {
      facilities,
      field,
    } = this.props;

    if (facilities) {
      return (
        <Fragment>
          {facilities.list.map((f) => (
            <HalidomItem
              key={f}
              index={f}
              field={field}
              facility={facilities[f]}
            />
          ))}
        </Fragment>
      );
    }

    return null;
  }
}


HalidomField.propTypes = propTypes;

export default HalidomField;