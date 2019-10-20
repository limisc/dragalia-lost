import React from 'react';
import { connect } from 'react-redux';
import { updateItem } from 'actions';
import { getImage, getLimit, refs } from 'utils';
import { Input } from 'components';
import SelectItem from './SelectItem';
import StatsAvatar from './StatsAvatar';

// eslint-disable-next-line no-shadow
function StatsField({ statsKey, item, setPanel, updateItem }) {
  const {
    bond,
    curRarity,
    ex,
    level,
    mana,
    name: nameProps,
    rarity,
    unbind,
    augHp = '',
    augStr = '',
  } = item || {};

  const image = getImage(item, statsKey);

  const [state, setState] = React.useState({
    bond,
    level,
    augHp,
    augStr,
  });

  const getUpdates = (key, value) => {
    if (state[key] && value === state[key]) return null;
    if (!state[key] && value === item[key]) return null;

    let updates = { [key]: value };
    switch (key) {
      case 'augHp':
      case 'augStr':
      case 'bond':
      case 'level': {
        const newKey = key === 'level' ? statsKey : key;
        const newRarity = statsKey === 'adventurer' ? curRarity : rarity;
        const limit = getLimit(newKey, newRarity, unbind);
        updates[key] = value > limit ? limit : value;
        break;
      }
      case 'curRarity':
        updates = {
          ...updates,
          level: getLimit(statsKey, value),
          mana: getLimit('mana', value),
          ex: value === '5' ? '4' : '0',
        };
        break;
      case 'mana':
        updates.ex = value === '50' ? '4' : '0';
        break;
      case 'ex':
        updates.mana = '45';
        break;
      case 'unbind': {
        updates.level = getLimit(statsKey, rarity, value);
        break;
      }
      default:
        break;
    }

    return updates;
  };

  const onChange = ({ target: { name, value } }) => {
    const updates = getUpdates(name, value);
    if (updates === null) return;

    const params = { statsKey, updates };
    if (Object.prototype.hasOwnProperty.call(state, name)) {
      let { [`${name}Id`]: timerId } = state;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        // if level and bond is '', set min value 1.
        if ((name === 'level' || name === 'bond') && updates[name] === '') {
          updates[name] = 1;
          setState({ ...state, [name]: 1 });
        }

        updateItem(params);
      }, 1000);

      setState({
        ...state,
        [`${name}Id`]: timerId,
        [name]: updates[name],
      });
    } else {
      if (updates.level) {
        setState({ ...state, level: updates.level });
      }

      updateItem(params);
    }
  };

  return (
    <div className="stats-field" ref={refs[statsKey]}>
      <StatsAvatar
        name={nameProps}
        statsKey={statsKey}
        image={image}
        setPanel={setPanel}
      />
      {item &&
        (statsKey === 'adventurer' ? (
          <div>
            <SelectItem
              label="mana"
              value={mana}
              rarity={curRarity}
              onChange={onChange}
            />
            <SelectItem label="ex" value={ex} onChange={onChange} />
            <Input label="augHp" value={state.augHp} onChange={onChange} />
            <Input label="augStr" value={state.augStr} onChange={onChange} />
            <Input label="level" value={state.level} onChange={onChange} />
            <SelectItem
              label="curRarity"
              value={curRarity}
              rarity={rarity}
              onChange={onChange}
            />
          </div>
        ) : (
          <div>
            <Input label="level" value={state.level} onChange={onChange} />
            <SelectItem label="unbind" value={unbind} onChange={onChange} />
            <Input label="augHp" value={state.augHp} onChange={onChange} />
            <Input label="augStr" value={state.augStr} onChange={onChange} />
            {statsKey === 'dragon' && (
              <Input label="bond" value={state.bond} onChange={onChange} />
            )}
          </div>
        ))}
    </div>
  );
}

const actionCreators = {
  updateItem,
};

export default connect(
  null,
  actionCreators
)(StatsField);
