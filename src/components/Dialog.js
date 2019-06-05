/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { elements, facilities, facilityMaterial, imageMap } from 'data';
import { translate } from 'actions';
import Select from './Select';
import withTheme from './withTheme';

class CustomDialog extends React.PureComponent {
  state = {
    type: this.props.type,
    element: this.props.element,
    weapon: this.props.weapon,
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  facilityTemplate = () => {
    const { type } = this.state;
    let { upgrade, types } = this.props;
    const label = type === 'dojo' ? 'weapon' : 'element';
    let options = this.props[`${label}s`];
    const disabled = upgrade && type === 'event';

    if (!upgrade) {
      types = types.slice(0, -1);
    } else if (type !== 'event') {
      options = Object.keys(imageMap[type]);
    }

    return (
      <DialogContent>
        <Select
          classes="col-2"
          label="type"
          value={type}
          options={types}
          onChange={this.onChange}
        />

        <Select
          classes="col-2"
          disabled={disabled}
          label={label}
          value={this.state[label]}
          options={options}
          onChange={this.onChange}
        />
      </DialogContent>
    );
  };

  handleCreate = () => {
    this.props.handleCreate(this.state);
  };

  render() {
    const { lang, open, handleClose } = this.props;
    const renderFacility = this.facilityTemplate();
    return (
      <Dialog
        open={open}
        maxWidth="xs"
        classes={{ paperScrollPaper: 'dialog-flex' }}
      >
        {renderFacility}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {translate('cancel', lang)}
          </Button>
          <Button onClick={this.handleCreate} color="primary">
            {translate('create', lang)}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CustomDialog.defaultProps = {
  upgrade: false,
  open: false,
  type: 'event',
  element: '',
  weapon: '',
  types: Object.keys(facilityMaterial),
  elements: Object.keys(elements),
  weapons: Object.keys(facilities.weapon),
};

export default withTheme(CustomDialog);
