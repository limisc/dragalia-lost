//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { translate } from 'appRedux/actions';
import { withTheme } from 'components';

class StatsDetail extends React.PureComponent {
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
  };

  render() {
    const { lang, open, cursor, title, details, onClick } = this.props;
    const name = title ? title[lang] : '';
    // TODO name overflow hidden
    return (
      <table id="stats-detail">
        <tbody>
          <tr style={{ cursor }} onClick={onClick}>
            <th>{name}</th>
            <th>{translate('HP', lang)}</th>
            <th>{translate('STR', lang)}</th>
            <th>{translate('might', lang)}</th>
          </tr>
          {open &&
            this.state.rows.map(row => {
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
    );
  }
}

export default withTheme(StatsDetail);
