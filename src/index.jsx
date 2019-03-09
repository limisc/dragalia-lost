/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';

import "./styles.css";
import { StatsCalc } from "views";
import { history, store, } from "store";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route
            path="/:page(stats_calc)/:lang(en|ja|zh)"
            component={StatsCalc}
          />
          <Route
            path="/"
            component={StatsCalc}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);