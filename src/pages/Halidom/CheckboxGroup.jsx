/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { Context } from 'components';
import { translate, useEventCallback } from 'utils';

const defaultProps = {
  label: '',
  checkAll: true,
  checkboxes: null,
};

function CheckboxGroup({ fieldset, checkAll, checkboxes, onChange }) {
  const { lang } = React.useContext(Context);
  const handleParent = useEventCallback(e => {
    const { checked } = e.target;
    const newCheckboxes = checkboxes.map(item => ({ ...item, checked }));
    onChange({ checkAll: checked, checkboxes: newCheckboxes });
  });

  const handleChild = useEventCallback(e => {
    const { name, checked } = e.target;
    let all = true;
    const newCheckboxes = checkboxes.map(item => {
      if (item.label === name) {
        if (all && !checked) all = false;
        return { ...item, checked };
      }

      if (all && !item.checked) all = false;
      return item;
    });

    onChange({ checkAll: all, checkboxes: newCheckboxes });
  });

  return (
    <div className="checkbox-group">
      <FormControlLabel
        control={
          <Checkbox
            checked={checkAll}
            color="primary"
            onChange={handleParent}
          />
        }
        label={translate(fieldset, lang)}
      />

      <FormGroup>
        {checkboxes &&
          checkboxes.map(item => (
            <FormControlLabel
              key={item.label}
              control={
                <Checkbox
                  name={item.label}
                  checked={item.checked}
                  color="primary"
                  onChange={handleChild}
                />
              }
              label={translate(item.label, lang)}
            />
          ))}
      </FormGroup>
    </div>
  );
}

CheckboxGroup.defaultProps = defaultProps;

export default React.memo(CheckboxGroup);
