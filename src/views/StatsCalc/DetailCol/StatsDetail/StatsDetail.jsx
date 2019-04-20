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
    return (
      <table>
        <tbody>
          <tr style={{ cursor }} onClick={onClick}>
            <th className="ellipsis">{name}</th>
            <th className="details-res">{translate('HP', lang)}</th>
            <th className="details-res">{translate('STR', lang)}</th>
            <th className="details-res">{translate('might', lang)}</th>
          </tr>
          {open &&
            this.state.rows.map(row => (
              <tr key={row}>
                <td className="details-title ellipsis">
                  {translate(row, lang)}
                </td>
                <td className="details-res">{details[row].HP}</td>
                <td className="details-res">{details[row].STR}</td>
                <td className="details-res">{details[row].might}</td>
              </tr>
            ))}

          <tr>
            <td className="details-title">{translate('total', lang)}</td>
            <td className="details-res">{details.total.HP}</td>
            <td className="details-res">{details.total.STR}</td>
            <td className="details-res">{details.total.might}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default withTheme(StatsDetail);
