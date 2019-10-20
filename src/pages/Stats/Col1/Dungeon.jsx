import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
// import clsx from 'clsx';
import { Input, Select } from 'components';
import { dungeonInfo, advantagedDungeon, COABILITY_DICT } from 'data';
import { calcDamage } from 'utils/calcStats';
import { calcVal } from 'utils';
import DamageBar from './DamageBar';

const dungeonOptions = Object.keys(dungeonInfo);
const difficultyOptions = ['N', 'H', 'VH', 'EX'];
const fieldArray = ['str', 'multiplier', 'exHp', 'exDef', 'hp', 'def'];

function Dungeon({ stats, totalHp }) {
  const [settings, setSettings] = useState(() => {
    // default VH - Expert difficulty
    const difficulty = 'VH';
    // auto set dungeon by adventurer's advantage element
    const dungeon = advantagedDungeon[stats.adventurer.element];
    const {
      [difficulty]: [str, multiplier],
    } = dungeonInfo[dungeon];
    return {
      dungeon,
      str,
      multiplier,
      difficulty,
      exHp: '',
      exDef: '',
      hp: '',
      def: '',
    };
  });

  const handleChange = e => {
    const { name, value } = e.target;

    if (value !== settings[name]) {
      setSettings(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const isMountRef = useRef(false);

  useEffect(() => {
    if (isMountRef.current) {
      const {
        [settings.dungeon]: {
          [settings.difficulty]: [str, multiplier],
        },
      } = dungeonInfo;

      setSettings(prevState => ({
        ...prevState,
        str,
        multiplier,
      }));
    } else {
      isMountRef.current = true;
    }
  }, [settings.dungeon, settings.difficulty, setSettings]);

  useEffect(() => {
    if (!stats.adventurer) return;

    const { ex, rarity, weapon, element } = stats.adventurer;

    // auto set dungeon by adventurer's advantage element
    const dungeon = advantagedDungeon[element];
    if (dungeon !== settings.dungeon) {
      setSettings(prevState => ({ ...prevState, dungeon }));
    }

    if (weapon === 'Axe' || weapon === 'Lance') {
      let exHp = '';
      let exDef = '';

      const value = COABILITY_DICT[`${weapon}_${rarity}`][ex];

      if (weapon === 'Axe') {
        exDef = value;
      } else if (weapon === 'Lance') {
        exHp = value;
      }

      setSettings(prevState => ({
        ...prevState,
        exHp,
        exDef,
      }));
    }
    // eslint-disable-next-line
  }, [stats.adventurer]);

  const damageState = React.useMemo(() => {
    const damageDetails = calcDamage(stats, settings);

    const hp = calcVal(
      totalHp * (1 + 0.01 * settings.hp) * (1 + 0.01 * settings.exHp)
    );

    return { hp, ...damageDetails };
  }, [stats, totalHp, settings]);

  return (
    <>
      <div className="col-2">
        <Select
          label="dungeon"
          options={dungeonOptions}
          value={settings.dungeon}
          onChange={handleChange}
        />

        <Select
          label="difficulty"
          options={difficultyOptions}
          value={settings.difficulty}
          onChange={handleChange}
        />

        {fieldArray.map(key => (
          <Input
            key={key}
            label={key}
            value={settings[key]}
            onChange={handleChange}
          />
        ))}
      </div>

      <DamageBar damageState={damageState} />
    </>
  );
}

const mapStateToProps = ({ stats }) => {
  return {
    stats,
  };
};

export default connect(mapStateToProps)(Dungeon);
