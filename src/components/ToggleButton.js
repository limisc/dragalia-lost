/* eslint-disable no-unused-vars */
import React, { memo, useContext } from 'react';
import { translate } from 'actions';
import Context from './Context';
import classNames from 'classnames';

const ToggleButton = memo(
  ({ id, width, labelOn, labelOff, disabled, checked, setChecked }) => {
    const { lang } = useContext(Context);
    const btn = classNames('toggle-btn', width, { active: checked });
    const btnInner = classNames('toggle-btn-inner', { active: checked });
    const btnSwitch = classNames(
      { 'toggle-btn-switch': !disabled },
      { active: checked }
    );

    return (
      <div className={btn}>
        <input
          type="checkbox"
          id={id}
          className="toggle-btn-checkbox"
          disabled={disabled}
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        <label className="toggle-btn-label" htmlFor={id}>
          <span className={btnInner}>
            <span>{translate(labelOn, lang)}</span>
            <span>{translate(labelOff, lang)}</span>
          </span>
          <div className={btnSwitch} />
        </label>
      </div>
    );
  }
);

export default ToggleButton;
