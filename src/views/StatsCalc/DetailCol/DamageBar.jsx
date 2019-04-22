//@flow
/* eslint-disable no-unused-vars */
import React from 'react';

class DamageBar extends React.PureComponent {
  render() {
    const { min, max, HP } = this.props;

    let pct = 0;
    if (HP > max) {
      pct = 100;
    } else if (HP <= max && HP > min) {
      pct = ((1.0 * (HP - 1 - min)) / (max - min)) * 100;
    }
    console.log(this.props)
    return (
      <div
        style={{
          width: '100%',
          height: '56px',
          backgroundColor: '#800000',
          marginTop: '8px',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: '#008000',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {pct !== 0 && `${pct.toFixed(2)}%`}
        </div>
      </div>
    );
  }
}

export default DamageBar;
