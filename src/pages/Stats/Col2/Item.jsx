import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import locales from 'locales';
import { updateItem } from 'actions';
import { Input } from 'components';
import { getLimit, getPaperBGC, useEvent } from 'utils';
import SelectItem from './SelectItem';

const getItemFields = key => {
  if (key === 'adventurer') {
    return ['level', 'curRarity', 'augHp', 'augStr', 'mana', 'ex'];
  }

  if (key === 'dragon') {
    return ['level', 'unbind', 'augHp', 'augStr', 'bond'];
  }

  return ['level', 'unbind', 'augHp', 'augStr'];
};

function Item({ focused, item, lang, theme, updateItem }) {
  const { level, bond, curRarity, Rarity, unbind } = item || {};

  const timeRef = useRef();
  const fields = getItemFields(focused);

  const changeInput = e => {
    const { name, value } = e.target;

    let max;
    if (focused === 'adventurer' && item.LimitBreak === '5') {
      max = 100;
    } else {
      const key1 = name === 'level' ? focused : name;
      const r = focused === 'adventurer' ? curRarity : Rarity;
      max = getLimit(key1, r, unbind);
    }

    const val = value > max ? max : value;
    if (item[name] === val) return;
    updateItem({ itemKey: focused, updates: { [name]: val } });
  };

  const getUpdates = (key, value) => {
    if (item[key] === value) return null;
    let updates = { [key]: value };

    switch (key) {
      case 'curRarity': {
        updates = {
          ...updates,
          level: getLimit(focused, value),
          mana: getLimit('mana', value),
          ex: value === '5' ? '4' : '0',
        };
        break;
      }
      case 'mana': {
        const limit = getLimit(focused, curRarity);
        updates.ex = value >= '50' ? '4' : '0';

        if (value === '70') {
          updates.level = 100;
        } else if (level > limit) {
          updates.level = limit;
        }

        break;
      }
      case 'ex':
        updates = {
          ...updates,
          curRarity: '5',
          mana: '45',
        };
        break;
      case 'unbind': {
        const level = getLimit(focused, Rarity, value);
        updates.level = level;
        break;
      }
      default:
        break;
    }

    return updates;
  };

  const handleChange = useEvent(({ name, value }) => {
    const updates = getUpdates(name, value);
    if (updates === null) return;
    updateItem({ itemKey: focused, updates });
  });

  const onClick = e => {
    const { name } = e.target;
    const max = getLimit(name);
    const value = Number(item[name]) === max ? '' : max;
    updateItem({ itemKey: focused, updates: { [name]: value } });
  };

  useEffect(() => {
    clearTimeout(timeRef.current);
    let key;
    if (level === '' || level === '0') {
      key = 'level';
    } else if (bond === '' || bond === '0') {
      key = 'bond';
    }

    if (key !== undefined) {
      timeRef.current = setTimeout(() => {
        updateItem({ itemKey: focused, updates: { [key]: 1 } });
      }, 1000);
    }
  }, [level, bond, focused, updateItem]);

  if (item === null) return null;

  return (
    <div className="grid-2 paper" style={getPaperBGC(theme)}>
      {fields.map(key => {
        const { [key]: value = '' } = item;

        if (
          key === 'curRarity' ||
          key === 'unbind' ||
          key === 'mana' ||
          key === 'ex'
        ) {
          let r;
          if (key === 'curRarity') {
            r = Rarity;
          } else if (key === 'mana') {
            r = curRarity;
          }

          return (
            <div key={key}>
              {locales(key, lang)}
              <SelectItem
                key={key}
                name={key}
                value={value}
                rarity={r}
                spiral={item.breakLimit === 5}
                onChange={handleChange}
              />
            </div>
          );
        }

        if (key === 'augHp' || key === 'augStr') {
          const max = getLimit(key);
          const arrowClassName = clsx(
            'arrow',
            Number(value) === max ? 'left' : 'right'
          );
          return (
            <div key={key}>
              {locales(key, lang)}
              <div className="input-btn">
                <Input name={key} value={value} onChange={changeInput} />

                <button
                  type="button"
                  tabIndex="-1"
                  name={key}
                  onClick={onClick}
                >
                  <span className={arrowClassName} />
                </button>
              </div>
            </div>
          );
        }

        return (
          <div key={key}>
            {locales(key, lang)}
            <Input name={key} value={value} onChange={changeInput} />
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = state => {
  const { focused, items, theme } = state;
  return {
    focused,
    theme,
    item: items[focused],
  };
};

const mapDispatchToProps = {
  updateItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
