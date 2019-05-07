/* eslint-disable no-unused-vars */
import React from 'react';

const Donation = () => {
  return (
    <div
      style={{
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <p>
        Dragalia Lost Stats Calculator is an open source project under MIT
        License.
        <br />
        <br />
        If you enjoy using this stats calculator, consider donating as a sign of
        appreciation.
        <br />
      </p>

      <div style={{ position: 'relative' }}>
        <img
          alt="patreon"
          src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png"
          width="160"
        />
        <a href="https://www.patreon.com/junlico">
          <span className="icon-link" />
        </a>
      </div>
    </div>
  );
};

export default Donation;
