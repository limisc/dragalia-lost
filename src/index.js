import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { history, store } from 'store';
import App from './App';
import './index.css';

const DragaliaLost = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/:page/:lang(en|ja|zh)?" component={App} />
        <Redirect to="/stats" />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<DragaliaLost />, document.getElementById('root'));
