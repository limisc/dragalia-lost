import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { COABILITY_VALUE, ELEMENT_ADV_TO_ENEMY, ENEMY_INFO } from 'data';
import { Select } from 'components';
import { useEvent } from 'utils';
import locales from 'locales';
import DamageBar from './DamageBar';

const enemyOptions = Object.keys(ENEMY_INFO);

// TODO: use filter for each enemy
const difficultyOptions = ['N', 'H', 'VH', 'EX'];

function Dungeon({ adventurer, lang }) {
  const [settings, setSettings] = useState({
    dcrStr: '',
    def: '',
    difficulty: 'VH',
    enemy: '',
    exHp: '',
    hp: '',
    multiplier: '',
  });

  const eleRef = useRef();

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
      <Select
        name="enemy"
        lang={lang}
        options={enemyOptions}
        value={settings.enemy}
        onChange={handleSelect}
      />

      <div className="grid-2">
        <div>
          {locales('difficulty', lang)}
          <Select
            name="difficulty"
            lang={lang}
            options={difficultyOptions}
            value={settings.difficulty}
            onChange={handleSelect}
          />
        </div>
        {['multiplier', 'dcrStr', 'def', 'exHp', 'hp'].map(key => {
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
