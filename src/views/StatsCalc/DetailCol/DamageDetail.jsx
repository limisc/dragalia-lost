//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { translate } from 'appRedux/actions';
import { withTheme } from 'components';

class DamageDetail extends React.PureComponent {
  render() {
    const { lang, baseHP, HP, exHP, min, max, textArea } = this.props;
    const tHP = Math.ceil(baseHP * (1 + HP * 0.01) * (1 + exHP * 0.01));
    return (
      <table id="damage-detail" className="gutter-top">
        <tbody>
          <tr>
            <th>Damage Detail</th>
          </tr>
          {min && (
            <>
              <tr>
                <td>{translate('HP', lang)}</td>
                <td>{translate('MIN', lang)}</td>
                <td>{translate('MAX', lang)}</td>
              </tr>

              <tr>
                <td>{tHP}</td>
                <td>{min}</td>
                <td>{max}</td>
              </tr>

              {textArea.map((t, i) => {
                const content = t.split(',');
                return (
                  <tr key={i}>
                    <td>{translate(content[0], lang)}</td>
                    <td>{translate(content[1], lang)}</td>
                    <td>{content[2]}</td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    );
  }
}

export default withTheme(DamageDetail);
