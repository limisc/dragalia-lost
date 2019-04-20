//@flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'components';
import routers from './routers';
// import { Helmet } from "react-helmet";

const App = () => {
  // TODO Helmet
  return (
    <ThemeProvider>
      {/* <Helmet htmlAttributes={{ lang }} /> */}
      <Switch>
        {routers.map(r => (
          <Route key={r.id} path={r.path} component={r.component} />
        ))}
      </Switch>
    </ThemeProvider>
  );
};

export default App;
