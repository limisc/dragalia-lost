/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { withTheme } from 'components';
import { translate } from 'actions';

class DungeonDamage extends React.PureComponent {
  state = { collapse: true };

  render() {
    const { lang, min, max, HP, textArea } = this.props;

    let pct = 0;
    if (HP > max) {
      pct = 100;
    } else if (HP <= max && HP > min) {
      pct = ((1.0 * (HP - 1 - min)) / (max - min)) * 100;
    }

    const { collapse } = this.state;
    const cursor = collapse ? 's-resize' : 'n-resize';
    return (
      <Fragment>
        <div
          style={{
            height: '56px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            background: `linear-gradient(120deg, green, #4ba946 ${pct}%, #DEB887 ${pct +
              5}%, #be3223 , #800000)`,
            cursor,
          }}
          className="fluid gutter center"
          onClick={this.toggleDetails}
        >
          {pct !== 0 && `${pct.toFixed(2)}%`}
        </div>

        {!this.state.collapse && (
          <table id="damage-detail">
            <tbody>
              <tr style={{ fontWeight: 'bold' }}>
                <td>{translate('HP', lang)}</td>
                <td>{translate('MIN', lang)}</td>
                <td>{translate('MAX', lang)}</td>
              </tr>

              <tr className="highlight">
                <td>{HP}</td>
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
            </tbody>
          </table>
        )}
      </Fragment>
    );
  }

  toggleDetails = () => this.setState(state => ({ collapse: !state.collapse }));
}

export default withTheme(DungeonDamage);
