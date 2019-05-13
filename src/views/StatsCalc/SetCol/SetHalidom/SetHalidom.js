/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AddBoxOutlined } from '@material-ui/icons';
import { getHalidomSectionKey } from 'actions';
import { Dialog } from 'components';
import SetBtns from './SetBtns';
import HalidomField from './HalidomField';

class SetHalidom extends React.Component {
  state = {
    fields: ['element', 'weapon', 'dragon'],
    open: false,
  };

  render() {
    const { fields, open } = this.state;
    return (
      <Fragment>
        <SetBtns />
        <div id="halidom-list">
          {this.props.simc && this.props.element && (
            <div className="facility-image">
              <AddBoxOutlined
                style={{ fontSize: '80px', fill: 'gray', cursor: 'pointer' }}
                onClick={this.handleOpen}
              />
            </div>
          )}
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

        <Dialog open={open} handleClose={this.handleClose} />
      </Fragment>
    );
  }

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
}

const mapStateToProps = ({ stats, simc }) => {
  const { element, weapon, dragon } = getHalidomSectionKey(stats);
  return { element, weapon, dragon, simc };
};

export default connect(mapStateToProps)(SetHalidom);
