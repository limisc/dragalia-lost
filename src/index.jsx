/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router';
import {
  history,
  store,
} from "store";
import { StatsCalc } from "views";
import "./styles.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route
            path="/:page(stats|dungeon)/:lang(en|ja|zh)"
            component={StatsCalc}
          />
          <Redirect to="/stats/en" />
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);