import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'components';
import routers from './routers';

const App = () => {
  return (
    <ThemeProvider>
      <Switch>
        {routers.map(r => (
          <Route key={r.id} path={r.path} component={r.component} />
        ))}
      </Switch>
    </ThemeProvider>
  );
};

export default App;
