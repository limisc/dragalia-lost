// @flow
import React from 'react';

class DamageBar extends React.PureComponent {

  render() {
    const {
      min,
      max,
      tHP,
    } = this.props;

    let pct;
    if (tHP > max) {
      pct = 100;
    } else if (tHP <= max && tHP > min) {
      pct = (tHP - 1 - min) * 100 * 1.0 / (max - min);
    } else {
      pct = 0;
    }
    return (
      <div
        style={{
          width: "100%",
          height: "56px",
          backgroundColor: "#3C020B",
          // backgroundColor: "#EEE",
          marginTop: "8px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            backgroundColor: "#1EA132",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >{pct !== 0 && `${pct.toFixed(2)}%`}</div>
      </div>
    )
  }
}

export default DamageBar;