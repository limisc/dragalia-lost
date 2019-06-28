/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  addHalidom,
  getHalidomSectionKey,
  getLimit,
  saveState,
  removeState,
  loadHalidom,
} from 'actions';
import { BtnGroups, Dialog } from 'components';
import HalidomField from './HalidomField';

class SetHalidom extends React.Component {
  state = {
    open: false,
    fields: ['element', 'weapon', 'dragon'],
    btns: ['load', 'del', 'save'],
  };

  handleClose = () => this.setState({ open: false });

  handleCreate = state => {
    const { type, element, weapon } = state;
    if ((type === 'dojo' && weapon) || (type !== 'dojo' && element)) {
      let field, section;
      if (type === 'dojo') {
        field = 'weapon';
        section = weapon;
      } else if (type === 'fafnir') {
        field = 'dragon';
        section = element;
      } else {
        field = 'element';
        section = element;
      }
      const item = { id: 'SIMC', type, level: getLimit(type) };
      this.props.addHalidom(field, section, item);
      this.handleClose();
    }
  };

  onClick = name => () => {
    const key = this.props.simc ? 'simcHalidom' : 'calcHalidom';
    switch (name) {
      case 'sync':
      case 'load':
        this.props.loadHalidom(name);
        break;
      case 'del':
        removeState(key);
        break;
      case 'save':
        saveState(key, this.props.halidom);
        break;
      case 'add':
        this.setState({ open: true });
        break;
      default:
        break;
    }
  };

  render() {
    const { simc, element, weapon, dragon } = this.props;
    const { open, fields, btns } = this.state;
    const newBtns = simc ? [...btns, 'add'] : btns;

    return (
      <Fragment>
        <BtnGroups
          className="col-2 col-4"
          btns={newBtns}
          onClick={this.onClick}
        />
        <div className="fill-remains">
          {fields.map(fKey => {
            // fKey: field Key
            // sKey: section Key
            const sKey = this.props[fKey];
            return (
              sKey && (
                <HalidomField key={`${fKey}_${sKey}`} fKey={fKey} sKey={sKey} />
              )
            );
          })}
        </div>

        {simc && (
          <Dialog
            open={open}
            element={element}
            weapon={weapon}
            dragon={dragon}
            handleClose={this.handleClose}
            handleCreate={this.handleCreate}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ halidom, stats, simc }) => {
  const { element, weapon, dragon } = getHalidomSectionKey(stats);
  return { element, weapon, dragon, halidom, simc };
};

const mapDispatchToProps = dispatch => {
  return {
    loadHalidom: variant => dispatch(loadHalidom(variant)),
    addHalidom: (field, section, item) =>
      dispatch(addHalidom(field, section, item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetHalidom);
