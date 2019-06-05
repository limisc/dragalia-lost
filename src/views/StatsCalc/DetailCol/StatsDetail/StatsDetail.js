/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { exValues } from 'data';
import { translate, getDetails, getDamage } from 'actions';
import { withTheme } from 'components';
import DungeonSelect from './DungeonSelect';
import DungeonSettings from './DungeonSettings';
import DungeonDamage from './DungeonDamage';

class StatsDetail extends React.Component {
  state = {
    rows: [
      'adventurer',
      'weapon',
      'wyrmprint1',
      'wyrmprint2',
      'dragon',
      'ability',
      'halidom',
    ],
    dungeon: 'hmc',
    exHP: '',
    exDef: '',
    HP: '',
    def: '',
  };

  static getDerivedStateFromProps(props, state) {
    const { adventurer } = props.stats;
    const { id, ex, weapon, rarity } = adventurer || {};

    if (
      (weapon === 'Axe' || weapon === 'Lance') &&
      (id !== state.id || ex !== state.ex)
    ) {
      let exHP, exDef;
      exHP = exDef = '';
      if (weapon === 'Axe') {
        exDef = exValues[weapon][rarity][ex];
      } else if (weapon === 'Lance') {
        exHP = exValues[weapon][rarity][ex];
      }
      return {
        id,
        ex,
        exHP,
        exDef,
      };
    }

    return null;
  }

  render() {
    const { rows, dungeon, ...res } = this.state;
    const { lang, expand, stats, halidom } = this.props;
    const { adventurer } = stats;
    let name, details;
    let max, min, totalHP, textArea;
    if (adventurer) {
      name = adventurer ? adventurer.name[lang] : '';
      details = getDetails(stats, halidom);
      totalHP = Math.ceil(
        details.trueHP *
          (1 + this.state.HP * 0.01) *
          (1 + this.state.exHP * 0.01)
      );
      const damage = getDamage(stats, this.state);
      max = damage.max;
      min = damage.min;
      textArea = damage.textArea;
    }

    return (
      <Fragment>
        {adventurer && (
          <Fragment>
            <table id="stats-detail" className="gutter">
              <tbody>
                <tr>
                  <th>{name}</th>
                  <th>{translate('HP', lang)}</th>
                  <th>{translate('STR', lang)}</th>
                  <th>{translate('might', lang)}</th>
                </tr>
                {expand &&
                  rows.map(row => {
                    const { HP, STR, might } = details[row];
                    return (
                      <tr key={row}>
                        <td>{translate(row, lang)}</td>
                        <td>{HP}</td>
                        <td>{STR}</td>
                        <td>{might}</td>
                      </tr>
                    );
                  })}

                <tr>
                  <td>{translate('total', lang)}</td>
                  <td>{details.total.HP}</td>
                  <td>{details.total.STR}</td>
                  <td>{details.total.might}</td>
                </tr>
              </tbody>
            </table>

            {!expand && (
              <Fragment>
                <DungeonSelect dungeon={dungeon} onChange={this.onChange} />
                <DungeonSettings onChange={this.onChange} {...res} />
                <DungeonDamage
                  min={min}
                  max={max}
                  HP={totalHP}
                  textArea={textArea}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });
}

const mapStateToProps = ({ stats, halidom }) => {
  return { stats, halidom };
};

export default withTheme(connect(mapStateToProps)(StatsDetail));
