import React from 'react';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  // basename: "/dungeon-check"
});

export const AppContext = React.createContext({
  // language: "en",
  // mode: "stats",
});