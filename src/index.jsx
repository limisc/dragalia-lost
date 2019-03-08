/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  // Switch
} from 'react-router-dom';

import "./styles.css";
import { store, history } from "store";
import { StatsCalc } from "views";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route
          path="/"
          component={StatsCalc}
        />
      </Router>
    </Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);