import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header, ContextProvider } from 'components';

const Stats = lazy(() => import('./pages/Stats'));
const Halidom = lazy(() => import('./pages/Halidom'));
const Facility = lazy(() => import('./pages/Facility'));

function CustomRoute({ component: Page, path }) {
  return (
    <Route
      path={path}
      render={({ history, match }) => {
        return (
          <ContextProvider history={history} match={match}>
            <Header />
            <Page />
          </ContextProvider>
        );
      }}
    />
  );
}

function Routes() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Switch>
        <CustomRoute path="/stats/:lang?" component={Stats} />
        <CustomRoute path="/halidom/:lang?" component={Halidom} />
        <CustomRoute path="/facility/:lang?" component={Facility} />
        <Redirect to="/stats/:lang?" />
      </Switch>
    </Suspense>
  );
}

export default Routes;
