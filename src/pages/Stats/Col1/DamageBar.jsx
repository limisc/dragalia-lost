import React from 'react';
import { Context } from 'components';
import { translate } from 'utils';

function DamageBar({ damageState: { arr, hp, max, min } }) {
  const { lang } = React.useContext(Context);

  let pct;

  if (hp > max) {
    pct = 100;
  } else if (hp <= min) {
    pct = 0;
  } else {
    pct = (100 * (hp - 1 - min)) / (max - min);
  }

  const background =
    `linear-gradient(120deg, green, #4ba946 ` +
    `${pct}%, #deb887 ${pct + 5}%, #be3223 , #800000)`;

  return (
    <>
      <div id="damage-bar" style={{ background }}>
        <span>{min}</span>
        <span style={{ fontSize: '20px' }}>{`${hp} (${pct.toFixed(2)}%)`}</span>
        <span>{max}</span>
      </div>

      <table>
        <tbody>
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

export default React.memo(DamageBar);
