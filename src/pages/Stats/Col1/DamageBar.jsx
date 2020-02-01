import React from 'react';
import { connect } from 'react-redux';
import { getDamage } from 'utils';

function DamageBar(props) {
  const { hp, min, max } = props;

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
    <div id="damage-bar" style={{ background }}>
      <span>{min}</span>
      <span style={{ fontSize: '20px' }}>{`${hp} (${pct.toFixed(2)}%)`}</span>
      <span>{max}</span>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const { hp, min, max } = getDamage(state, props);
  return { hp, min, max };
};

export default connect(mapStateToProps)(DamageBar);
