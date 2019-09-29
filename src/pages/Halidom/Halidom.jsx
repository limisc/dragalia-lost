/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { CheckBtns } from 'components';
import { makeCheckedArr, clearCheckedArr, makeFilters } from 'utils/filters';
import HalidomList from './HalidomList';
import Setting from './Setting';

function Halidom() {
  const [elementDisabled, setElementDisabled] = useState(false);
  const [elements, setElements] = useState(makeCheckedArr('element'));

  const [weaponDisabled, setWeaponDisabled] = useState(false);
  const [weapons, setWeapons] = useState(makeCheckedArr('weapon'));

  const [elementFilters, setElementFilters] = useState([]);
  const [weaponFilters, setWeaponFilters] = useState([]);

  const handleClear = e => {
    const { name } = e.currentTarget;
    if (name === 'element' && !elementDisabled) {
      setElements(prev => clearCheckedArr(prev));
    } else if (name === 'weapon' && !weaponDisabled) {
      setWeapons(prev => clearCheckedArr(prev));
    }
  };

  useEffect(() => {
    const filters = makeFilters({
      arr: elements,
      name: 'element',
      disabled: elementDisabled,
    });

    setElementFilters(filters);
  }, [elements, elementDisabled]);

  useEffect(() => {
    const filters = makeFilters({
      arr: weapons,
      name: 'weapon',
      disabled: weaponDisabled,
    });

    setWeaponFilters(filters);
  }, [weapons, weaponDisabled]);

  const handleEleDis = e => {
    setElementDisabled(e.target.checked);
  };

  const handleWeaponDis = e => {
    setWeaponDisabled(e.target.checked);
  };

  return (
    <main id="halidom">
      <div>
        <Setting />

        <div className="col-2">
          {/* <Checkbox
            icon={false}
            label="disable"
            checked={elementDisabled}
            setChecked={setElementDisabled}
          /> */}

          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={elementDisabled}
                onChange={handleEleDis}
              />
            }
            label="disable"
          />
          <Button variant="outlined" name="element" onClick={handleClear}>
            CLEAR
          </Button>
        </div>
        <CheckBtns
          btns={elements}
          disabled={elementDisabled}
          name="element"
          setChecked={setElements}
        />

        <div className="col-2">
          {/* <Checkbox
            icon={false}
            label="disable"
            checked={weaponDisabled}
            setChecked={setWeaponDisabled}
          /> */}

          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={weaponDisabled}
                onChange={handleWeaponDis}
              />
            }
            label="disable"
          />

          <Button variant="outlined" name="weapon" onClick={handleClear}>
            CLEAR
          </Button>
        </div>
        <CheckBtns
          btns={weapons}
          disabled={weaponDisabled}
          name="weapon"
          setChecked={setWeapons}
        />
      </div>
      <div>
        <HalidomList elements={elementFilters} weapons={weaponFilters} />
      </div>
    </main>
  );
}

export default React.memo(Halidom);
