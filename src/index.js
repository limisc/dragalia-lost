import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { history, store } from './store';
import { ThemeProvider } from './components';
import { Header } from './views';
import routers from './routers';
import './index.css';

const CustomRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <ThemeProvider>
        <Header />
        <main>
          <Component {...props} />
        </main>
      </ThemeProvider>
    )}
  />
);

const DragaliaLost = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        {routers.map(r => (
          <CustomRoute key={r.id} path={r.path} component={r.component} />
        ))}
        <Redirect to="/stats" />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<DragaliaLost />, document.getElementById('root'));
