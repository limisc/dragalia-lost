/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import clsx from 'clsx';
import { Input, Select } from 'components';
import { dungeonInfo, COABILITY_DICT } from 'data';
import { calcDamage } from 'utils/calcStats';
import { calcVal } from 'utils';
import DamageBar from './DamageBar';

const dungeonArr = Object.keys(dungeonInfo);
const settingsArr = ['exHp', 'exDef', 'hp', 'def'];

function Dungeon({ stats, totalHp }) {
  const [hide, setHide] = useState('hide');
  useEffect(() => {
    setTimeout(() => {
      setHide(null);
    }, 250);
  }, []);

  const [dungeon, setDungeon] = useState('hzd');
  const [collapse, setCollapse] = useState(false);
  const [str, setStr] = useState('');
  const [multiplier, setMultiplier] = useState('');

  const handleCollapse = e => {
    setCollapse(e.target.checked);
  };

  useEffect(() => {
    const info = dungeonInfo[dungeon];
    setStr(info.str);
    setMultiplier(info.multiplier);
  }, [dungeon]);

  const handleDungeon = ({ target: { value } }) => {
    setDungeon(value);
  };

  const handleStr = e => {
    setStr(e.target.value);
  };

  const handleMultiplier = e => {
    setMultiplier(e.target.value);
  };

  const [state, setState] = useState({
    exHp: '',
    exDef: '',
    hp: '',
    def: '',
  });

  const onChange = ({ target: { name, value } }) => {
    setState(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!stats.adventurer) return;

    const { ex, rarity, weapon } = stats.adventurer;

    if (weapon === 'Axe' || weapon === 'Lance') {
      let key;
      if (weapon === 'Axe') {
        key = 'exDef';
      } else if (weapon === 'Lance') {
        key = 'exHp';
      }

      const temp = COABILITY_DICT[`${weapon}_${rarity}`][ex];
      if (temp === state[key]) return;

      setState(prev => ({
        ...prev,
        [key]: temp,
      }));
    }
    // eslint-disable-next-line
  }, [stats.adventurer]);

  const damageState = React.useMemo(() => {
    const { exHp, exDef, def } = state;
    const damageDetails = calcDamage(stats, {
      dungeon,
      str,
      multiplier,
      def,
      exDef,
    });

    const hp = calcVal(totalHp * (1 + 0.01 * state.hp) * (1 + 0.01 * exHp));

    return { hp, ...damageDetails };
  }, [stats, totalHp, dungeon, str, multiplier, state]);

  const cn = clsx('col-2', 'animated-collapse', { collapse: !collapse });

  return (
    <div className={hide}>
      <div className="col-2">
        <Select
          options={dungeonArr}
          label="dungeon"
          value={dungeon}
          onChange={handleDungeon}
        />

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={collapse}
              onChange={handleCollapse}
            />
          }
          label="setting"
        />
      </div>

      <div className={cn}>
        <Input label="str" value={str} onChange={handleStr} />

        <Input
          label="multiplier"
          value={multiplier}
          type="float"
          onChange={handleMultiplier}
        />
      </div>

      <div className="col-2">
        {settingsArr.map(el => (
          <Input
            key={el}
            adornment="%"
            label={el}
            value={state[el]}
            onChange={onChange}
          />
        ))}
      </div>

      <DamageBar damageState={damageState} />
    </div>
  );
}

export default React.memo(Dungeon);
