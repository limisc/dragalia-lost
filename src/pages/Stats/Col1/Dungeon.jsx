import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { COABILITY_VALUE, ELEMENT_ADV_TO_ENEMY, ENEMY_INFO } from 'data';
import { Input, Select } from 'components';
import { getPaperBGC } from 'utils';
import locales from 'locales';
import SelectEnemy from './SelectEnemy';
import DamageBar from './DamageBar';

const fields = ['multiplier', 'exHp', 'hp', 'exDef', 'def', 'res', 'dcrStr'];
const SPECIAL_EX = ['10450102', '10450302', '10550404'];

function Dungeon({ adventurer, lang, theme }) {
  const [settings, setSettings] = useState({
    dcrStr: '',
    def: '',
    difficulty: 'VH',
    enemy: '',
    exHp: '',
    exDef: '',
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

  const handleSelect = useCallback(({ name, value }) => {
    setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  }, []);

  const handleInput = useCallback(e => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  }, []);

  useEffect(() => {
    if (settings.enemy !== '') {
      const { multiplier } = ENEMY_INFO[settings.enemy].info[
        settings.difficulty
      ];
      setSettings(prevSettings => ({ ...prevSettings, multiplier }));
    }
  }, [settings.enemy, settings.difficulty]);

  useEffect(() => {
    const { Element, Weapon, Id, Rarity, ex } = adventurer || {};

    if (eleRef.current !== Element) {
      const enemy = ELEMENT_ADV_TO_ENEMY[Element];
      setSettings(prevSettings => ({
        ...prevSettings,
        enemy,
      }));

      eleRef.current = Element;
    }

    let exHp = '';
    let exDef = '';

    if (!SPECIAL_EX.includes(Id)) {
      if (Weapon === 'Axe') {
        exDef = COABILITY_VALUE[Weapon][Rarity][ex];
      } else if (Weapon === 'Lance') {
        exHp = COABILITY_VALUE[Weapon][Rarity][ex];
      }
    }

    setSettings(prevSettings => ({
      ...prevSettings,
      exHp,
      exDef,
    }));
    // eslint-disable-next-line
  }, [adventurer.Id, adventurer.ex]);

  return (
    <>
      <SelectEnemy
        name="enemy"
        value={settings.enemy}
        onChange={handleSelect}
      />

      <div className="grid-2 paper" style={getPaperBGC(theme)}>
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
          const step = key === 'multiplier' ? '0.01' : '1';
          return (
            <div key={key}>
              {locales(key, lang)}
              <Input
                name={key}
                step={step}
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
    theme: state.theme,
    adventurer: state.items.adventurer,
  };
};

export default connect(mapStateToProps)(Dungeon);
