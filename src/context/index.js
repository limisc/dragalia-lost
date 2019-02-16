import React from 'react';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: "/dragalia-lost"
});

export const AppContext = React.createContext({
  // language: "en",
  // mode: "stats",
});