/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getLimit, updateStats } from 'actions';
import { Input, SelectItem } from 'components';
import StatsAvatar from './StatsAvatar';

class StatsField extends Component {
  constructor(props) {
    super(props);
    const { bond, level } = props.item || {};
    this.state = {
      bond,
      level,
      augHP: '',
      augSTR: '',
    };
  }

  render() {
    const { augHP, augSTR, bond, level } = this.state;
    const { item, statsKey } = this.props;
    const { id, ex, name, mana, unbind, rarity, curRarity } = item || {};
    const exDisabled = curRarity !== '5';
    let image = 'add';
    if (item) {
      if (statsKey === 'adventurer') {
        image = `${id}_r0${curRarity}`;
      } else if (statsKey === 'wyrmprint1' || statsKey === 'wyrmprint2') {
        const variation = unbind * 1 >= 2 ? '2' : '1';
        image = `${id}_0${variation}`;
      } else {
        image = id;
      }
    }

    return (
      <div className="flex stats-field gutter-bottom">
        <StatsAvatar statsKey={statsKey} image={image} name={name} />

        {item && (
          <div className="flex fill-remains center-v">
            {statsKey === 'adventurer' ? (
              <Fragment>
                {/* <Input label="level" value={level} onChange={this.onChange} />
                <SelectItem
                  label="curRarity"
                  value={curRarity}
                  rarity={rarity}
                  onChange={this.onChange}
                /> */}
                <SelectItem
                  label="mana"
                  value={mana}
                  rarity={curRarity}
                  onChange={this.onChange}
                />

                <SelectItem
                  label="ex"
                  value={ex}
                  disabled={exDisabled}
                  onChange={this.onChange}
                />
              </Fragment>
            ) : (
              <Fragment>
                <Input label="level" value={level} onChange={this.onChange} />
                <SelectItem
                  label="unbind"
                  value={unbind}
                  onChange={this.onChange}
                />
              </Fragment>
            )}

            <Input label="augHP" value={augHP} onChange={this.onChange} />
            <Input label="augSTR" value={augSTR} onChange={this.onChange} />

            {/* {statsKey === 'dragon' && (
              <Input label="bond" value={bond} onChange={this.onChange} />
            )} */}
          </div>
        )}
      </div>
    );
  }

  onChange = ({ target: { name, value } }) => {
    const updates = this.getUpdates(name, value);
    const { statsKey, updateStats } = this.props;

    if (this.state.hasOwnProperty(name)) {
      let { [`${name}Id`]: timerId } = this.state;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        // if level and bond is '', set min value 1.
        if ((name === 'level' || name === 'bond') && updates[name] === '') {
          updates[name] = 1;
          this.setState({ [name]: 1 });
        }
        updateStats(statsKey, updates);
      }, 1000);

      this.setState({
        [`${name}Id`]: timerId,
        [name]: updates[name],
      });
    } else {
      const { level } = updates;
      if (level) {
        this.setState({ level });
      }
      updateStats(statsKey, updates);
    }
  };

  getUpdates = (key, value) => {
    let updates = { [key]: value };
    const { statsKey, item } = this.props;
    const { unbind, rarity, curRarity } = item;

    switch (key) {
      case 'augHP':
      case 'augSTR':
        const augLimit = getLimit('augments');
        const intAug = value * 1 || '';
        updates[key] = intAug > augLimit ? augLimit : intAug;
        break;
      case 'level':
        const temp = statsKey === 'adventurer' ? curRarity : rarity;
        const intLevel = value * 1 || '';
        const limit = getLimit(statsKey, temp, unbind);
        updates.level = intLevel > limit ? limit : intLevel;
        break;
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
      case 'unbind':
        updates.level = getLimit(statsKey, rarity, value);
        break;
      case 'bond':
        const intBond = value * 1 || '';
        const bondLimit = getLimit('bond');
        updates.bond = intBond > bondLimit ? bondLimit : intBond;
        break;
      default:
        break;
    }
    return updates;
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateStats: (statsKey, updates) =>
      dispatch(updateStats(statsKey, updates)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(StatsField);
