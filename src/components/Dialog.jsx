import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { keyDict, HALIDOM_TYPES } from 'data';
import { translate, useEventCallback } from 'utils';
import { Context } from './ContextProvider';
import Select from './Select';

function CustomDialog({ open, setOpen, onCreate }) {
  const { lang } = React.useContext(Context);
  const handleClose = () => {
    setOpen(false);
  };

  const [{ type, field }, setState] = React.useState({
    type: 'dojo',
    field: '',
  });

  const onChange = useEventCallback(e => {
    const { name, value } = e.target;

    let params;
    if (name === 'type') {
      if (value === type) return;

      if (
        type === 'dojo' ||
        type === 'event' ||
        value === 'dojo' ||
        value === 'event'
      ) {
        params = { type: value, field: '' };
      } else {
        params = { type: value };
      }
    } else {
      if (value === field) return;

      params = { field: value };
    }
    setState(prev => ({ ...prev, ...params }));
  });

  const handleCreate = useEventCallback(() => {
    if (type !== 'event' && field === '') return;
    if (onCreate) {
      onCreate({ type, field });
    }
    handleClose();
  });

  const label = type === 'dojo' ? 'weapon' : 'element';
  const disabled = type === 'event';
  const opt1 = [...HALIDOM_TYPES, 'dracolith'];
  const opt2 = Object.keys(keyDict[type]);

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      classes={{ paperScrollPaper: 'dialog-flex' }}
    >
      <DialogContent classes={{ root: 'col-2' }}>
        <Select label="type" value={type} options={opt1} onChange={onChange} />

        <Select
          disabled={disabled}
          label={label}
          value={field}
          options={opt2}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          {translate('cancel', lang)}
        </Button>
        <Button color="primary" onClick={handleCreate}>
          {translate('create', lang)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(CustomDialog);
