/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getHalidomSectionKey } from 'actions';
import SetBtns from './SetBtns';
import HalidomField from './HalidomField';

class SetHalidom extends React.Component {
  state = {
    fields: ['element', 'weapon', 'dragon'],
  };

  render() {
    const { fields } = this.state;
    return (
      <Fragment>
        <SetBtns />
        <div id="halidom-list">
          {fields.map(fKey => {
            // fKey: field Key
            // sKey: section Key
            const sKey = this.props[fKey];
            return sKey ? (
              <HalidomField key={`${fKey}_${sKey}`} fKey={fKey} sKey={sKey} />
            ) : (
              undefined
            );
          })}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ stats }) => {
  const { element, weapon, dragon } = getHalidomSectionKey(stats);
  return { element, weapon, dragon };
};

export default connect(mapStateToProps)(SetHalidom);
