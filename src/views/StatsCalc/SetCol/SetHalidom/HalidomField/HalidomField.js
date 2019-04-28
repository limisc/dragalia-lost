/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Item from './Item';

class HalidomField extends React.Component {
  render() {
    const { fKey, sKey, halidom } = this.props;
    const section = halidom[fKey][sKey];
    return (
      <Fragment>
        {section
          ? Object.keys(section).map(iKey => (
              <Item
                key={iKey}
                fKey={fKey}
                sKey={sKey}
                iKey={iKey}
                item={section[iKey]}
              />
            ))
          : undefined}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ halidom }) => {
  return { halidom };
};

export default connect(mapStateToProps)(HalidomField);
