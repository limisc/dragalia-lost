/* eslint-disable no-unused-vars */
import React, { memo, Fragment } from 'react';

const GitHubIcon = memo(() => {
  return (
    <Fragment>
      <img
        alt="github"
        src={`${process.env.PUBLIC_URL}/images/icon/github.png`}
      />

      <a
        href="https://github.com/junlico/dragalia-lost"
        title="GitHub Repository"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="icon-link" />
      </a>
    </Fragment>
  );
});

export default GitHubIcon;
