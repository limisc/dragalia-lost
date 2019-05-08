/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';

const Donation = () => {
  return (
    <Fragment>
      <div
        style={{ margin: '0 auto', display: 'flex', flexDirection: 'column' }}
      >
        <p>
          Dragalia Lost Stats Calculator is an open source project under MIT
          License.
          <br />
          <br />
          If you enjoy using this stats calculator, consider donating as a sign
          of appreciation.
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

      <p style={{ position: 'fixed', bottom: '0' }}>
        <img
          alt="donation"
          src={`${process.env.PUBLIC_URL}/images/icon/donation.svg`}
          width="32"
          style={{ marginRight: '8px' }}
        />
        made by{' '}
        <a
          href="https://www.freepik.com/"
          title="Freepik"
          rel="noopener noreferrer"
          target="_blank"
        >
          Freepik
        </a>{' '}
        from{' '}
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          rel="noopener noreferrer"
          target="_blank"
        >
          www.flaticon.com
        </a>{' '}
        is licensed by{' '}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          rel="noopener noreferrer"
          target="_blank"
        >
          CC 3.0 BY
        </a>
      </p>
    </Fragment>
  );
};

export default Donation;
