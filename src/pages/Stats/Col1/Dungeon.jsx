import React, { useEffect, useMemo, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { COABILITY_VALUE, ELEMENT_ADV_TO_ENEMY, ENEMY_INFO } from 'data';
import { Select } from 'components';
import { useEvent } from 'utils';
import locales from 'locales';
import SelectEnemy from './SelectEnemy';
import DamageBar from './DamageBar';

const fields = ['multiplier', 'exHp', 'hp', 'def', 'res', 'dcrStr'];

function Dungeon({ adventurer, lang }) {
  const [settings, setSettings] = useState({
    dcrStr: '',
    def: '',
    difficulty: 'VH',
    enemy: '',
    exHp: '',
    hp: '',
    multiplier: '',
    res: '',
  });

  const eleRef = useRef();

  const difficultyOptions = useMemo(() => {
    return ['EX', 'VH', 'H', 'N'].map(value => ({
      value,
      label: locales(value, lang),
    }));
  }, [lang]);

  const handleSelect = useEvent(({ name, value }) => {
    setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  });

  const handleInput = e => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  };

  useEffect(() => {
    if (settings.enemy !== '') {
      const { multiplier } = ENEMY_INFO[settings.enemy].info[
        settings.difficulty
      ];
      setSettings(prevSettings => ({ ...prevSettings, multiplier }));
    }
  }, [settings.enemy, settings.difficulty]);

  useEffect(() => {
    const { element, weapon, Id, rarity, ex } = adventurer || {};

    if (eleRef.current !== element) {
      const enemy = ELEMENT_ADV_TO_ENEMY[element];
      setSettings(prevSettings => ({
        ...prevSettings,
        enemy,
      }));

      eleRef.current = element;
    }

    if (weapon === 'Axe' || weapon === 'Lance') {
      let exHp = '';
      let def = '';

      const value = COABILITY_VALUE[weapon][rarity][ex];

      if (weapon === 'Axe') {
        def = value;

        if (Id === '10450102') {
          def = '';
        }
      } else if (weapon === 'Lance') {
        exHp = value;
      }

      setSettings(prevSettings => ({
        ...prevSettings,
        exHp,
        def,
      }));
    }
  }, [adventurer]);

  return (
    <>
      <SelectEnemy
        name="enemy"
        value={settings.enemy}
        onChange={handleSelect}
      />

      <div className="grid-2">
        <div>
          {locales('difficulty', lang)}
          <Select
            name="difficulty"
            options={difficultyOptions}
            label={locales(settings.difficulty, lang)}
            value={settings.difficulty}
            onChange={handleSelect}
          />
        </div>
        {fields.map(key => {
          return (
            <div key={key}>
              {locales(key, lang)}
              <input
                type="number"
                name={key}
                value={settings[key]}
                onChange={handleInput}
              />
            </div>
          );
        })}
      </div>

      {adventurer && <DamageBar settings={settings} />}
    </>
  );
}

const mapStateToProps = state => {
  return {
    adventurer: state.items.adventurer,
  };
};

export default connect(mapStateToProps)(Dungeon);
