import React from 'react';
import { Context } from 'components';
import { translate } from 'utils';

const defaultProps = {
  arr: [],
  hp: 0,
  max: 0,
  min: 0,
};

function DamageBar({ damageState: { arr, hp, max, min } }) {
  const { lang } = React.useContext(Context);

  const pct = React.useMemo(() => {
    if (hp > max) return 100;

    if (hp <= min) return 0;

    return (100 * (hp - 1 - min)) / (max - min);
  }, [hp, min, max]);

  return (
    <>
      <div
        id="damage-bar"
        style={{
          background: `linear-gradient(120deg, green, #4ba946 ${pct}%, #deb887 ${pct +
            5}%, #be3223 , #800000)`,
        }}
      >
        {`${pct.toFixed(2)}%`}
      </div>

      <table>
        <tbody>
          <tr style={{ fontWeight: 'bold' }}>
            <td>HP </td>
            <td>MIN</td>
            <td>MAX</td>
          </tr>

          <tr>
            <td>{hp}</td>
            <td>{min}</td>
            <td>{max}</td>
          </tr>

          {arr.map(t => {
            const content = t.split(',');
            return (
              <tr key={`${content[0]}_${content[1]}`}>
                <td>{translate(content[0], lang)}</td>
                <td>{translate(content[1], lang)}</td>
                <td>{translate(content[2], lang)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

DamageBar.defaultProps = defaultProps;

export default React.memo(DamageBar);
